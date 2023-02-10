import {Validator} from "@lib/model/Validator";
import {UniqueException} from "@lib/model/app-exception/UniqueException";
import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";

import {Step} from "../model/Step";
import {CreateStep} from "../model/CreateStep";
import {StepRepository} from "../port/StepRepository";

export class CreateStepUseCase extends ValidateCommandUseCase<CreateStep, Promise<Step>> {
    constructor(
        private repository: StepRepository,
        private validateUtils: Validator<CreateStep>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: CreateStep): Promise<Step> {
        const isInterviewTemplateStep = await this.repository.isExists(data.name, data.interviewTemplateId);

        if (isInterviewTemplateStep) {
            throw new UniqueException(`InterviewStep name ${data.name} already existed`);
        }

        return await this.repository.create(data);
    }
}