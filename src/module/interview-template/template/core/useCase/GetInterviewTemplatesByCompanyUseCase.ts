import {CommandUseCase} from "../../../../../lib/model/CommandUseCase";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";
import {InterviewTemplate} from "../model/InterviewTemplate";

export class GetInterviewTemplatesByCompanyUseCase implements CommandUseCase<string, Promise<InterviewTemplate[]>> {
    constructor(
        private  repository: InterviewTemplateRepository
    ) {}

    async execute(id: string): Promise<InterviewTemplate[]> {
        return await this.repository.getByCompany(id);
    }
}