import {Question} from "@module/interview-template/question/core/model/Question";

export type QuestionsInStep = {
    stepId: string,
    questionCategoryId: string,
    questionCategoryName: string,
    questions: Question[]
}