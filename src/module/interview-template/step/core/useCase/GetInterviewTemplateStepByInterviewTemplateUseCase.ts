import {CommandUseCase} from "@lib/model/CommandUseCase";

import {InterviewTemplateStepRepository} from "../port/InterviewTemplateStepRepository";
import {InterviewTemplateStep} from "../model/InterviewTemplateStep";

export class GetInterviewTemplateStepByInterviewTemplateUseCase implements CommandUseCase<string, Promise<InterviewTemplateStep[]>> {
    constructor(
        private  interviewTemplateStepRepository: InterviewTemplateStepRepository
    ) {}

    async execute(interviewTemplateId: string): Promise<InterviewTemplateStep[]> {
        return await this.interviewTemplateStepRepository.getByInterviewTemplate(interviewTemplateId);
    }
}