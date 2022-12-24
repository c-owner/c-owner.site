import { findQuestion } from '~/server/database/repositories/askCornerRepository'
import { getUserById } from '~/server/database/repositories/userRepository'
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
    const queries = getQuery(event)

    let tempId: number = parseInt(queries.id as string)
    if (typeof queries.id === 'string') {
        tempId = parseInt(queries.id as string)
    }

    const questionId = tempId;

    const question = await findQuestion(questionId)

    for (const answer of question.answers) {
        const user = await getUserById(answer.authorId)
        // @ts-ignore
        answer.authorName = '@' + user.username
    }

    const user = await getUserById(question.authorId)
    // @ts-ignore
    question.authName = '@' + user.username

    return question
})
