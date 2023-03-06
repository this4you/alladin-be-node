import {Question} from "@module/interview-template/question/core/model/Question";

export type StepCategoryQuestion = {
    stepCategoryId: string,
    categoryName: string,
    position: number,
    questions: (Question&{position: number})[]
}