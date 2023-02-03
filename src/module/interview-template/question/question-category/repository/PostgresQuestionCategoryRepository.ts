import questionCategoryRepository from "@db/postgre/repositories/questionCategoryRepository";

import {QuestionCategoryRepository} from "../core/port/QuestionCategoryRepository";
import {QuestionCategory} from "../core/model/QuestionCategory";

export class PostgresQuestionCategoryRepository implements QuestionCategoryRepository {
    async getAll(): Promise<QuestionCategory[]> {
        return await questionCategoryRepository.find();
    }
}