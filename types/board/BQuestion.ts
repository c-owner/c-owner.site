type BQuestion = {
    id: number;
    authorId: number;
    authName?: string;
    title: string;
    description: string;
    answers: BAnswer[];
}
