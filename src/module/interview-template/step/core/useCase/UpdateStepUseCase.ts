import {StepRepository} from "src/module/interview-template/step/core/port/StepRepository";
import {UniqueException} from "@lib/model/app-exception/UniqueException";
import {UpdateStep} from "src/module/interview-template/step/core/model/UpdateStep";
import {Validator} from "@lib/model/Validator";
import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";

export class UpdateStepUseCase extends ValidateCommandUseCase<UpdateStep, Promise<UpdateStep>> {
    constructor(
        private repository: StepRepository,
        private validateUtils: Validator<UpdateStep>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: UpdateStep): Promise<UpdateStep> {
        const isInterviewTemplate = await this.repository.isExists(data.name, data.interviewTemplateId);

        if (isInterviewTemplate) {
            throw new UniqueException(`Interview name ${data.name} in companyId ${data.interviewTemplateId} already existed`);
        }

        return await this.repository.update(data);
    }

}