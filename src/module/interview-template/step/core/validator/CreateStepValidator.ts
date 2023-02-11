import {Validator} from "@lib/model/Validator";
import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {CreateStep} from "../model/CreateStep";

export class CreateStepValidator implements Validator<CreateStep> {
    constructor(
        private validateUtils: ValidatorUtils
    ) {}

    validate(data: CreateStep): void {
        this.validateUtils.validate('name', data.name)
            .required()
            .maxLength(20);
    }
}