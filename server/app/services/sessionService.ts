import { User } from '@prisma/client'
import { H3Event, setCookie } from "h3";
import { v4 as uuidv4 } from 'uuid'
import { createSession, getSessionByAuthToken } from "~/server/database/repositories/sessionRepository";
import { sanitizeUserForFrontend } from "~/server/app/services/userService";

export async function makeSession(user: User, event: H3Event): Promise<User | undefined> {
    const authToken = uuidv4().replaceAll('-', '')
    const session = await createSession({ authToken, userId: user.id })
    const userId = session.userId

    if (userId) {
        setCookie(event, 'auth_token', authToken, { path: '/', httpOnly: true })
        return getUserBySessionToken(authToken)
    }

    throw Error('세션 생성에 실패하였습니다.')

}

export async function getUserBySessionToken(authToken: string): Promise<User|undefined> {
    const session = await getSessionByAuthToken(authToken)
    console.log(session);

    // @ts-ignore
    return sanitizeUserForFrontend(session.user)
}
