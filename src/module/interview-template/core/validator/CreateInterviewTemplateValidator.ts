import {Validator} from "../../../../lib/model/Validator";
import {CreateInterviewTemplate} from "../model/CreateInterviewTemplate";
import {ValidatorUtils} from "../../../../lib/utils/ValidatorUtils";

export class CreateInterviewTemplateValidator implements Validator<CreateInterviewTemplate> {
    constructor(
        private validateUtils: ValidatorUtils
    ) {}

    validate(data: CreateInterviewTemplate): void {
        this.validateUtils.validate('name', data.name)
            .required()
            .maxLength(20);
    }
}