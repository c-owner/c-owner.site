import { defineEventHandler, getCookie, readBody } from 'h3'
import { editQuestion, findQuestion } from '~/server/database/repositories/askCornerRepository'
import { getUserBySessionToken } from '~/server/app/services/sessionService'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const data: BQuestionPost = body.data
    const questionId = data.id
    // todo: add validation
    const question = await findQuestion(questionId)

    question.description = data.description
    question.title = data.title

    const authToken = getCookie(event, 'auth_token')
    const user = await getUserBySessionToken(authToken)

    const result = await editQuestion(question)

    return {
        statusCode: 200,
        result: result,
        message: 'success'
    }
})
