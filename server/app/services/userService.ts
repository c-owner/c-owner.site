import { RegistrationRequest } from '~/types/AuthRegistration'
import { validate } from '~/server/app/services/validators/validator'
import { AuthUser } from '~/types/AuthUser'
import { User } from '@prisma/client'
import { getCookie, H3Event } from 'h3'
import { isString } from '@vueuse/core'
import { getUserBySessionToken } from '~/server/app/services/sessionService'

export async function validateUser(data: RegistrationRequest) {
    const errors = await validate(data)

    if (errors.size > 0) {
        return { hasErrors: true, errors }
    }
    return { hasErrors: false }
}

export function sanitizeUserForFrontend(user: AuthUser | undefined): User | undefined {
    if (!user) {
        return user
    }

    delete user.password
    delete user.loginType
    delete user.stripeCustomerId

    return user as User
}

export async function authCheck(event: H3Event): Promise<boolean> {
    const authToken = getCookie(event, 'auth_token')
    const hasAuthToken = isString(authToken)

    if (!hasAuthToken) {
        return false
    }

    const user = await getUserBySessionToken(authToken)
    // @ts-ignore
    if (user?.id) {
        return true
    }

    return false
}
