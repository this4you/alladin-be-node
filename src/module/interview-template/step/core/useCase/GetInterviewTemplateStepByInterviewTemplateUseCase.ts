import {CommandUseCase} from "../../../../../lib/model/CommandUseCase";
import {InterviewTemplateStepRepository} from "../port/InterviewTemplateStepRepository";
import {InterviewTemplateStep} from "../model/InterviewTemplateStep";

export class GetInterviewTemplateStepByInterviewTemplateUseCase implements CommandUseCase<string, Promise<InterviewTemplateStep[]>> {
    constructor(
        private  repository: InterviewTemplateStepRepository
    ) {}

    async execute(interviewTemplateId: string): Promise<InterviewTemplateStep[]> {
        return await this.repository.getByInterviewTemplate(interviewTemplateId);
    }
}