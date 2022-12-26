import { createError, defineEventHandler, getCookie, readBody, sendError } from 'h3'
import { editAnswer, findAnswer } from "~/server/database/repositories/askCornerRepository";
import { getUserBySessionToken } from '~/server/app/services/sessionService'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    body.data.updatedAt = new Date()

    const data: BAnswerPost = body.data
    const answerId = data.id
    // todo: add validation
    let answer = await findAnswer(answerId)
    answer.text = data.text
    answer.updatedAt = data.updatedAt

    const authToken = getCookie(event, 'auth_token')
    const user = await getUserBySessionToken(authToken)


    if (!user) {
        return sendError(event, createError({ statusCode: 403, statusMessage: '권한없음' }))
    }

    // @ts-ignore
    const result = await editAnswer(answer)

    return {
        statusCode: 200,
        result: result,
        message: 'success'
    }
})
