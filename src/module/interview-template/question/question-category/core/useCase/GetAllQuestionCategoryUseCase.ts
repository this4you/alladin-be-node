import {CommandUseCase} from "../../../../../../lib/model/CommandUseCase";
import {QuestionCategory} from "../model/QuestionCategory";
import {QuestionCategoryRepository} from "../port/QuestionCategoryRepository";

export class GetAllQuestionCategoryUseCase implements CommandUseCase<string, Promise<QuestionCategory[]>> {
    constructor(
        private questionCategoryRepository: QuestionCategoryRepository
    ) {}

    async execute(): Promise<QuestionCategory[]> {
        return await this.questionCategoryRepository.getAll();
    }
}