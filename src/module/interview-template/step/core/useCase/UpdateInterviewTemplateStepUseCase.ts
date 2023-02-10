import {CommandUseCase} from "@lib/model/CommandUseCase";

import {InterviewTemplateStep} from "../model/InterviewTemplateStep";
import {InterviewTemplateStepRepository} from "../port/InterviewTemplateStepRepository";
import {UniqueException} from "@lib/model/app-exception/UniqueException";
import {UpdateInterviewTemplateStep} from "../model/UpdateInterviewTemplateStep";

export class UpdateInterviewTemplateStepUseCase implements CommandUseCase<InterviewTemplateStep> {
    constructor(
        private repository: InterviewTemplateStepRepository
    ) {}

    async execute(data: UpdateInterviewTemplateStep): Promise<UpdateInterviewTemplateStep> {
        const isInterviewTemplate = await this.repository.isExists(data.name, data.interviewTemplateId);

        if (isInterviewTemplate) {
            throw new UniqueException(`Interview name ${data.name} in companyId ${data.interviewTemplateId} already existed`)
        }

        return await this.repository.update(data);
    }
}