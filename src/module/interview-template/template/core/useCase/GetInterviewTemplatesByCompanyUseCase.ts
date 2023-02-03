import {CommandUseCase} from "@lib/model/CommandUseCase";

import {InterviewTemplate} from "../model/InterviewTemplate";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";

export class GetInterviewTemplatesByCompanyUseCase implements CommandUseCase<string, Promise<InterviewTemplate[]>> {
    constructor(
        private  repository: InterviewTemplateRepository
    ) {}

    async execute(id: string): Promise<InterviewTemplate[]> {
        return await this.repository.getByCompany(id);
    }
}