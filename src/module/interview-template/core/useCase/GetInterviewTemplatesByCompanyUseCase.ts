import {CommandUseCase} from "../../../../lib/model/CommandUseCase";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";
import {InterviewTemplate} from "../model/InterviewTemplate";

export class GetInterviewTemplatesByCompanyUseCase implements CommandUseCase<string, Promise<InterviewTemplate[]>> {
    constructor(
        private  interviewTemplateRepository: InterviewTemplateRepository
    ) {}

    async execute(companyId: string): Promise<InterviewTemplate[]> {
        return await this.interviewTemplateRepository.get(companyId);
    }
}