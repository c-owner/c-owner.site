import { createError, defineEventHandler, getCookie, readBody, sendError } from "h3";
import { editQuestion, findQuestion } from '~/server/database/repositories/askCornerRepository'
import { getUserBySessionToken } from '~/server/app/services/sessionService'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    body.data.updatedAt = dayjs().utc().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')

    const data: BQuestionPost = body.data
    const questionId = data.id
    // todo: add validation
    const question = await findQuestion(questionId)

    question.description = data.description
    question.title = data.title

    const authToken = getCookie(event, 'auth_token')
    const user = await getUserBySessionToken(authToken)

    if(!user) {
        return sendError(event, createError({ statusCode: 403, statusMessage: '권한없음' }));
    }

    const result = await editQuestion(question)

    return {
        statusCode: 200,
        result: result,
        message: 'success'
    }
})
