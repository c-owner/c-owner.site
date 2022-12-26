import { createError, defineEventHandler, getCookie, readBody, sendError } from "h3";
import { deleteAnswer, findAnswer } from "~/server/database/repositories/askCornerRepository";
import sendDefaultErrorResponse from "~/server/app/errors/responses/DefaultErrorResponse";
import { getUserBySessionToken } from "~/server/app/services/sessionService";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const answer = await findAnswer(parseInt(body.id))
    const authToken = getCookie(event, 'auth_token')

    // todo: replace everywere with middleware
    if (authToken == null) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 403, '로그인이 필요합니다.')
    }

    const user = await getUserBySessionToken(authToken)
    if (!user) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 405, '권한없음')
    }

    // @ts-ignore
    const isMine = user.id == answer.authorId
    if (!isMine) {
        sendError(event, createError({ statusCode: 403, statusMessage: '권한없음' }))
    }

    // @ts-ignore
    const result = await deleteAnswer(answer.id)
    if (!result) {
        return sendError(event, createError({ statusCode: 500, statusMessage: '삭제 실패' }))
    }

    return {
        statusCode: 200,
        result: true,
        message: 'success'
    }

})
