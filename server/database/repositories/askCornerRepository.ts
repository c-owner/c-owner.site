import prisma from '~/server/database/client'

export async function createQuestion(data: BQuestionPost, authorId: number) {
    return await prisma.question.create({
        data: {
            authorId: authorId,
            title: data.title,
            description: data.description,
            updatedAt: data.updatedAt
        }
    })
}

export async function findQuestion(id: number | undefined): Promise<BQuestion> {
    // @ts-ignore
    return await prisma.question.findUnique({
        where: {
            id: id
        },
        include: {
            answers: true
        }
    })
}

export async function searchQuestions(query: string) {
    return await prisma.question.findMany({
        where: {
            OR: [
                {
                    title: { contains: query }
                },
                {
                    description: { contains: query }
                }
            ]
        },
        include: {
            answers: true
        }
    })
}

export async function editQuestion(question: BQuestionPost) {
    return await prisma.question.update({
        where: {
            id: question.id
        },
        data: {
            title: question.title,
            description: question.description,
            updatedAt: question.updatedAt
        }
    })
}

export async function deleteQuestion(id: number) {
    // question Id
    return await prisma.question.delete({
        where: {
            id: id
        }
    })
}

export async function createAnswer(data: BAnswerPost, authorId: number) {
    return await prisma.answer.create({
        data: {
            authorId: authorId,
            questionId: data.questionId,
            text: data.text
        }
    })
}

export async function defaultAnswer(id: number) {
    return await prisma.answer.delete({
        where: {
            id: id
        }
    })
}

export async function editAnswer(answer: BAnswerPost) {
    return await prisma.answer.update({
        where: {
            id: answer.id
        },
        data: {
            text: answer.text
        }
    })
}
