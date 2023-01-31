import {CommandUseCase} from "../../../../../../lib/model/CommandUseCase";
import {QuestionCategoryInStep} from "../model/QuestionCategoryInStep";
import {QuestionCategoryInStepRepository} from "../port/QuestionCategoryInStepRepository";

export class GetQuestionCategoryInStepUseCase implements CommandUseCase<string, Promise<QuestionCategoryInStep[]>> {
    constructor(
        private  repository: QuestionCategoryInStepRepository
    ) {}

    async execute(interviewTemplateStepId: string): Promise<QuestionCategoryInStep[]> {
        return await this.repository.get(interviewTemplateStepId);
    }

}