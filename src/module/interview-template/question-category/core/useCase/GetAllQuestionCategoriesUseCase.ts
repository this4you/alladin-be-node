import {CommandUseCase} from "@lib/model/CommandUseCase";

import {QuestionCategory} from "src/module/interview-template/question-category/core/model/QuestionCategory";
import {QuestionCategoryRepository} from "src/module/interview-template/question-category/core/port/QuestionCategoryRepository";

export class GetAllQuestionCategoriesUseCase implements CommandUseCase<string, Promise<QuestionCategory[]>> {
    constructor(
        private repository: QuestionCategoryRepository
    ) {}

    async execute(): Promise<QuestionCategory[]> {
        return await this.repository.getAll();
    }
}