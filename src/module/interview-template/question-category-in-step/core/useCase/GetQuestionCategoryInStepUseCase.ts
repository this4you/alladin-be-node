import {CommandUseCase} from "@lib/model/CommandUseCase";

import {QuestionCategoryInStep} from "src/module/interview-template/question-category-in-step/core/model/QuestionCategoryInStep";
import {QuestionCategoryInStepRepository} from "src/module/interview-template/question-category-in-step/core/port/QuestionCategoryInStepRepository";

export class GetQuestionCategoryInStepUseCase implements CommandUseCase<string, Promise<QuestionCategoryInStep[]>> {
    constructor(
        private  repository: QuestionCategoryInStepRepository
    ) {}

    async execute(interviewTemplateStepId: string): Promise<QuestionCategoryInStep[]> {
        return await this.repository.get(interviewTemplateStepId);
    }

}