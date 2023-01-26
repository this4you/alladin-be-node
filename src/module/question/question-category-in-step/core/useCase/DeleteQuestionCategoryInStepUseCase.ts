import {CommandUseCase} from "../../../../../lib/model/CommandUseCase";
import {QuestionCategoryInStepRepository} from "../port/QuestionCategoryInStepRepository";

export class DeleteQuestionCategoryInStepUseCase implements CommandUseCase<string, Promise<void>> {
    constructor(
        private  questionCategoryInStepRepository: QuestionCategoryInStepRepository
    ) {}
    async execute(id: string): Promise<void> {
        await this.questionCategoryInStepRepository.delete(id);
    }
}