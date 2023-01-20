import {CommandUseCase} from "../../../../lib/model/CommandUseCase";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";
import {InterviewTemplate} from "../model/InterviewTemplate";

export class UpdateInterviewTemplateUseCase implements CommandUseCase<InterviewTemplate> {
    constructor(
        private  interviewTemplateRepository: InterviewTemplateRepository
    ) {}

    async execute(data: InterviewTemplate): Promise<InterviewTemplate> {
        return await this.interviewTemplateRepository.updateInterviewTemplate(data);
    }
}