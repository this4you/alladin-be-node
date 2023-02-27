import {QuestionCategory} from "@module/interview-template/question-category/core/model/QuestionCategory";

export interface QuestionCategoryRepository {
    getAll(): Promise<QuestionCategory[]>
    get(data: Pick<QuestionCategory, "id">): Promise<QuestionCategory[]>
}