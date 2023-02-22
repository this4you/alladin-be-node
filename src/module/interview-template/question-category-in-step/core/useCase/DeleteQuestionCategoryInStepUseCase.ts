import {CommandUseCase} from "@lib/model/CommandUseCase";

import {QuestionCategoryInStepRepository} from "src/module/interview-template/question-category-in-step/core/port/QuestionCategoryInStepRepository";

export class DeleteQuestionCategoryInStepUseCase implements CommandUseCase<string, Promise<void>> {
    constructor(
        private  repository: QuestionCategoryInStepRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}