export type QuestionsInStep = {
    stepId: string,
    categoryId: string,
    categoryName: string,
    questions: Question[]
}

export type Question = {
    id: string;
    text: string;
}