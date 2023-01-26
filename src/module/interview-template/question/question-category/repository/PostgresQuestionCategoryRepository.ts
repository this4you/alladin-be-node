import {QuestionCategoryRepository} from "../core/port/QuestionCategoryRepository";
import questionCategoryRepository from "../../../../../db/postgre/repositories/questionCategoryRepository";
import {QuestionCategory} from "../core/model/QuestionCategory";

export class PostgresQuestionCategoryRepository implements QuestionCategoryRepository {
    async getAll(): Promise<QuestionCategory[]> {
        return await questionCategoryRepository.find();
    }
}