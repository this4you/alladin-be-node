import questionCategoryRepository from "@db/postgre/repositories/questionCategoryRepository";

import {QuestionCategoryRepository} from "@module/interview-template/question-category/core/port/QuestionCategoryRepository";
import {QuestionCategory} from "@module/interview-template/question-category/core/model/QuestionCategory";

export class PostgresQuestionCategoryRepository implements QuestionCategoryRepository {
    async getAll(): Promise<QuestionCategory[]> {
        return await questionCategoryRepository.find();
    }

    async get(data: Pick<QuestionCategory, "id">): Promise<QuestionCategory[]> {
        return await questionCategoryRepository.findBy(data);
    }
}