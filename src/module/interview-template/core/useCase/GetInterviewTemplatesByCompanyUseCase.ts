import {CommandUseCase} from "../../../../lib/model/CommandUseCase";
import {NotFoundException} from "../../../../lib/model/app-exception/NotFoundException";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";
import {InterviewTemplate} from "../model/InterviewTemplate";

export class GetInterviewTemplatesByCompanyUseCase implements CommandUseCase<string, Promise<InterviewTemplate[]>> {
    constructor(
        private  interviewTemplateRepository: InterviewTemplateRepository
    ) {}

    async execute(companyId: string): Promise<InterviewTemplate[]> {
        const interviewTemplate = await this.interviewTemplateRepository.getInterviewTemplatesByCompany(companyId);

        if (interviewTemplate == null) {
            throw new NotFoundException(`InterviewTemplate with id: ${companyId} was not found!`)
        }

        return interviewTemplate;
    }
}