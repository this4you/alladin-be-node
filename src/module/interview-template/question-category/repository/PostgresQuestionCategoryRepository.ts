import questionCategoryRepository from "@db/postgre/repositories/questionCategoryRepository";

import {QuestionCategoryRepository} from "src/module/interview-template/question-category/core/port/QuestionCategoryRepository";
import {QuestionCategory} from "src/module/interview-template/question-category/core/model/QuestionCategory";

export class PostgresQuestionCategoryRepository implements QuestionCategoryRepository {
    async getAll(): Promise<QuestionCategory[]> {
        return await questionCategoryRepository.find();
    }
}