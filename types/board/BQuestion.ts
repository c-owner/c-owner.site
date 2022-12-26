type BQuestion = {
    id: number
    authorId: number
    authName?: string
    title: string
    description: string
    updatedAt: Date
    answers: BAnswer[]
}
