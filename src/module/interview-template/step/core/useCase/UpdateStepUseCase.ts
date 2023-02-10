import {CommandUseCase} from "@lib/model/CommandUseCase";

import {Step} from "../model/Step";
import {StepRepository} from "../port/StepRepository";
import {UniqueException} from "@lib/model/app-exception/UniqueException";
import {UpdateStep} from "../model/UpdateStep";

export class UpdateStepUseCase implements CommandUseCase<Step> {
    constructor(
        private repository: StepRepository
    ) {}

    async execute(data: UpdateStep): Promise<UpdateStep> {
        const isInterviewTemplate = await this.repository.isExists(data.name, data.interviewTemplateId);

        if (isInterviewTemplate) {
            throw new UniqueException(`Interview name ${data.name} in companyId ${data.interviewTemplateId} already existed`);
        }

        return await this.repository.update(data);
    }
}