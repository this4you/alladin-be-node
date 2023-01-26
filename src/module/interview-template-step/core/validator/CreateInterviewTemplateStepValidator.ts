import {Validator} from "../../../../lib/model/Validator";
import {ValidatorUtils} from "../../../../lib/utils/ValidatorUtils";
import {CreateInterviewTemplateStep} from "../model/CreateInterviewTemplateStep";

export class CreateInterviewTemplateStepValidator implements Validator<CreateInterviewTemplateStep> {
    constructor(
        private validateUtils: ValidatorUtils
    ) {}

    validate(data: CreateInterviewTemplateStep): void {
        this.validateUtils.validate('name', data.name)
            .required()
            .maxLength(20);
    }
}