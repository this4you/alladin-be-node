import {Validator} from "@lib/model/Validator";
import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {CreateInterviewTemplate} from "../model/CreateInterviewTemplate";

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