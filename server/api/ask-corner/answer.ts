import { eventHandler, getCookie, readBody } from "h3";
import sendDefaultErrorResponse from "~/server/app/errors/responses/DefaultErrorResponse";
import { getUserBySessionToken } from "~/server/app/services/sessionService";
import { createAnswer } from "~/server/database/repositories/askCornerRepository";
import dayjs from "dayjs";

export default eventHandler(async (event) => {
    const body = await readBody(event)

    body.data.createdAt = dayjs().utc().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
    body.data.updatedAt = body.data.createdAt = dayjs().utc().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')

    const data: BAnswerPost = body.data
    const authToken = getCookie(event, 'auth_token')  ?? null

    if (authToken == null) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 403, '답변을 달려면 로그인이 필요합니다.')
    }
    const user = await getUserBySessionToken(authToken)

    if (!user) {
        return await sendDefaultErrorResponse(event, 'Unauthorized', 403, '권한이 없습니다..')
    }

    return await createAnswer(data, user['id'])

})
