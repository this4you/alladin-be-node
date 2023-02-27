import {Question} from "@module/interview-template/question/core/model/Question";

interface NewQuestion extends Question {
    position: number;
}

export type StepFrame = {
    stepCategoryId: string,
    categoryName: string,
    position: number,
    questions: NewQuestion[]
}