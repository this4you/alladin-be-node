import {Validator} from "@lib/model/Validator";
import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {UpdateStep} from "@module/interview-template/step/core/model/UpdateStep";

export class UpdateStepValidator implements Validator<UpdateStep> {
    constructor(
        private validateUtils: ValidatorUtils
    ) {}

    validate(data: UpdateStep): void {
        this.validateUtils.validate('name', data.name)
            .required()
            .maxLength(20);
    }

}