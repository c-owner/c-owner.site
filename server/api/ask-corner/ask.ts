import { eventHandler, getCookie, readBody } from 'h3'
import sendDefaultErrorResponse from '~/server/app/errors/responses/DefaultErrorResponse'
import { getUserBySessionToken } from '~/server/app/services/sessionService'
import { createQuestion } from '~/server/database/repositories/askCornerRepository'

export default eventHandler(async (event) => {
    //    todo: 유효성 추가
    const body = await readBody(event)
    const authToken = getCookie(event, 'auth_token')
    if (!authToken) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 403, '로그인이 필요합니다.')
    }

    const user = await getUserBySessionToken(authToken)

    if (!user) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 403, '로그인이 필요합니다.')
    }

    body.data.updatedAt = new Date()
    const data: BQuestionPost = body.data
    const userId: number = parseInt(user['id'])

    return await createQuestion(data, userId)
})
