import { searchQuestions } from '~/server/database/repositories/askCornerRepository'
import { getUserById } from '~/server/database/repositories/userRepository'

export default eventHandler(async (event) => {
    const queries = getQuery(event)

    const questions = await searchQuestions(queries.search as string)

    const questionWithAuth = await Promise.all(
        // @ts-ignore
        questions.map(async (question: BQuestion) => {
            const user = await getUserById(question.authorId)
            // @ts-ignore
            question.authName = '@' + user.username
            // @ts-ignore
            return { ...question, authName: '@' + user.username }
        })
    )
    return questionWithAuth
})
