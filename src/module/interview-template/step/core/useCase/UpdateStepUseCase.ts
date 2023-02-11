
import {Step} from "../model/Step";
import {StepRepository} from "../port/StepRepository";
import {UniqueException} from "@lib/model/app-exception/UniqueException";
import {UpdateStep} from "../model/UpdateStep";
import {Validator} from "@lib/model/Validator";
import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";

export class UpdateStepUseCase extends ValidateCommandUseCase<UpdateStep, Promise<Step>> {
    constructor(
        private repository: StepRepository,
        private validateUtils: Validator<UpdateStep>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: UpdateStep): Promise<Step> {
        const isInterviewTemplate = await this.repository.isExists(data.name, data.interviewTemplateId);

        if (isInterviewTemplate) {
            throw new UniqueException(`Interview name ${data.name} in companyId ${data.interviewTemplateId} already existed`);
        }

        return await this.repository.update(data);
    }

}