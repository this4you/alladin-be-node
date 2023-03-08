import {Question} from "@module/interview-template/question/core/model/Question";

export type UpdateQuestion = Pick<Question, "id" | "text" | "stepCategoryId">;