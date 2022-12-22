import { AuthSession } from '~/types/AuthSession'
import prisma from '~/server/database/client'
import { User } from '@prisma/client'

export async function createSession(sessionData: AuthSession): Promise<AuthSession> {
    if (!sessionData.authToken) {
        throw Error('세션에 인증 토큰이 없습니다.')
    }

    const create = await prisma.session.create({
        // @ts-ignore
        data: {
            userId: sessionData.userId,
            authToken: sessionData.authToken
        }
    })

    return create
}

export async function getSessionByAuthToken(authToken: string): Promise<AuthSession> {
    const user: User = await getUserByAuthToken(authToken) as unknown as User

    return { authToken, user }
}

async function getUserByAuthToken(authToken: string): Promise<User | null> {
    return prisma.session
        .findUnique({
            where: {
                authToken: authToken
            }
        }).user()
}
