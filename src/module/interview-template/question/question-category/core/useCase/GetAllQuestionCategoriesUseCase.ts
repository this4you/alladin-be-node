import {CommandUseCase} from "../../../../../../lib/model/CommandUseCase";
import {QuestionCategory} from "../model/QuestionCategory";
import {QuestionCategoryRepository} from "../port/QuestionCategoryRepository";

export class GetAllQuestionCategoriesUseCase implements CommandUseCase<string, Promise<QuestionCategory[]>> {
    constructor(
        private repository: QuestionCategoryRepository
    ) {}

    async execute(): Promise<QuestionCategory[]> {
        return await this.repository.getAll();
    }
}