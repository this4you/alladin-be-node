import {ValidateCommandUseCase} from "../../../../lib/model/ValidateCommandUseCase";
import {InterviewTemplateStep} from "../model/InterviewTemplateStep";
import {CreateInterviewTemplateStep} from "../model/CreateInterviewTemplateStep";
import {InterviewTemplateStepRepository} from "../port/InterviewTemplateStepRepository";
import {Validator} from "../../../../lib/model/Validator";
import {UniqueException} from "../../../../lib/model/app-exception/UniqueException";

export class CreateInterviewTemplateStepUseCase extends ValidateCommandUseCase<CreateInterviewTemplateStep, Promise<InterviewTemplateStep>> {
    constructor(
        private repository: InterviewTemplateStepRepository,
        private validateUtils: Validator<CreateInterviewTemplateStep>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: CreateInterviewTemplateStep): Promise<InterviewTemplateStep> {
        const isInterviewTemplateStep = await this.repository.isInterviewTemplateStepByName(data)

        if (isInterviewTemplateStep) {
            throw new UniqueException(`InterviewStep name ${data.name} already existed`)
        }

        return await this.repository.createInterviewTemplateStep(data);
    }
}