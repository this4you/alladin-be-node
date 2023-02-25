import {Question} from "@module/interview-template/question/core/model/Question";

export type QuestionsInStep = {
    stepId: string,
    categoryId: string,
    categoryName: string,
    questions: Pick<Question, "id" | "text">[]
}