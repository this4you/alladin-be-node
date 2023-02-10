import {CommandUseCase} from "@lib/model/CommandUseCase";

import {InterviewTemplate} from "src/module/interview-template/template/core/model/InterviewTemplate";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";

export class UpdateInterviewTemplateUseCase implements CommandUseCase<InterviewTemplate> {
    constructor(
        private  repository: InterviewTemplateRepository
    ) {}

    async execute(data: InterviewTemplate): Promise<InterviewTemplate> {
        return await this.repository.update(data);
    }
}