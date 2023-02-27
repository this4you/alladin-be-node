import {CommandUseCase} from "@lib/model/CommandUseCase";
import {QuestionCategory} from "@module/interview-template/question-category/core/model/QuestionCategory";
import {
    QuestionCategoryRepository
} from "@module/interview-template/question-category/core/port/QuestionCategoryRepository";

export class GetQuestionCategoriesUseCase implements CommandUseCase<Pick<QuestionCategory, "id">, Promise<QuestionCategory[]>> {
    constructor(
        private questionCategoryRepository: QuestionCategoryRepository
    ) {}

    async execute(data: Pick<QuestionCategory, "id">): Promise<QuestionCategory[]> {
        return await this.questionCategoryRepository.get(data);
    }
}