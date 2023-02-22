import {QuestionCategory} from "src/module/interview-template/question-category/core/model/QuestionCategory";

export interface QuestionCategoryRepository {
    getAll(): Promise<QuestionCategory[]>
}