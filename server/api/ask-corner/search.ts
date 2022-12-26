import { searchQuestions } from '~/server/database/repositories/askCornerRepository'
import { getUserById } from '~/server/database/repositories/userRepository'
import { eventHandler, getQuery } from "h3";

export default eventHandler(async (event) => {
    const queries = getQuery(event)

    const questions = await searchQuestions(queries.search as string)


    const questionWithAuth = await Promise.all(
        // @ts-ignore
        questions.map(async (question: BQuestion) => {
            const user = await getUserById(question.authorId)
            question.authName = '@' + user?.username
            const totalAnswer = question.answers?.length

            // @ts-ignore
            delete question.answers

            return { ...question, authName: '@' + user?.username, totalAnswer: totalAnswer }
        })
    )

    return questionWithAuth
})
