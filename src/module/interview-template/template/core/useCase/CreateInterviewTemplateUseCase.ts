import {Validator} from "@lib/model/Validator";
import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";
import {UniqueException} from "@lib/model/app-exception/UniqueException";

import {CreateInterviewTemplate} from "../model/CreateInterviewTemplate";
import {InterviewTemplate} from "../model/InterviewTemplate";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";

export class CreateInterviewTemplateUseCase extends ValidateCommandUseCase<CreateInterviewTemplate, Promise<InterviewTemplate>> {
    constructor(
        private repository: InterviewTemplateRepository,
        private validateUtils: Validator<CreateInterviewTemplate>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: CreateInterviewTemplate): Promise<InterviewTemplate> {
        const isInterviewTemplate = await this.repository.isExists(data.name, data.companyId);

        if (isInterviewTemplate) {
            throw new UniqueException(`InterviewTemplate name: '${data.name}' in Company: '${data.companyId}' already existed`)
        }

        return await this.repository.create(data);
    }
}