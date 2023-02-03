import {CommandUseCase} from "@lib/model/CommandUseCase";

import {InterviewTemplateStep} from "../model/InterviewTemplateStep";
import {InterviewTemplateStepRepository} from "../port/InterviewTemplateStepRepository";

export class UpdateInterviewTemplateStepUseCase implements CommandUseCase<InterviewTemplateStep> {
    constructor(
        private repository: InterviewTemplateStepRepository
    ) {}

    async execute(data: InterviewTemplateStep): Promise<InterviewTemplateStep> {
        return await this.repository.update(data);
    }
}