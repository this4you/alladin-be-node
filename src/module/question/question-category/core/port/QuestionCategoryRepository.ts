import {QuestionCategory} from "../model/QuestionCategory";

export interface QuestionCategoryRepository {
    getAll(): Promise<QuestionCategory[]>
}