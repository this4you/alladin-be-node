import {CommandUseCase} from "@lib/model/CommandUseCase";

import {InterviewTemplate} from "src/module/interview-template/template/core/model/InterviewTemplate";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";
import {UniqueException} from "@lib/model/app-exception/UniqueException";
import {UpdateInterviewTemplate} from "../model/UpdateInterviewTemplate";

export class UpdateInterviewTemplateUseCase implements CommandUseCase<InterviewTemplate> {
    constructor(
        private  repository: InterviewTemplateRepository
    ) {}

    async execute(data: UpdateInterviewTemplate): Promise<InterviewTemplate> {
        const isInterviewTemplate = await this.repository.isExists(data.name, data.companyId);

        if (isInterviewTemplate) {
            throw new UniqueException(`Interview name ${data.name} in companyId ${data.companyId} already existed`)
        }

        return await this.repository.update(data);
    }
}