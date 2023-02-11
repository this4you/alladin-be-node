import {CommandUseCase} from "@lib/model/CommandUseCase";

import {InterviewTemplate} from "src/module/interview-template/template/core/model/InterviewTemplate";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";
import {UniqueException} from "@lib/model/app-exception/UniqueException";
import {UpdateInterviewTemplate} from "../model/UpdateInterviewTemplate";
import {Validator} from "@lib/model/Validator";
import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";

export class UpdateInterviewTemplateUseCase extends ValidateCommandUseCase<UpdateInterviewTemplate, Promise<InterviewTemplate>> {
    constructor(
        private  repository: InterviewTemplateRepository,
        private validateUtils: Validator<UpdateInterviewTemplate>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: UpdateInterviewTemplate): Promise<InterviewTemplate> {
        const isInterviewTemplate = await this.repository.isExists(data.name, data.companyId);

        if (isInterviewTemplate) {
            throw new UniqueException(`Interview name ${data.name} in companyId ${data.companyId} already existed`)
        }

        return await this.repository.update(data);
    }

}