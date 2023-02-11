import {Validator} from "@lib/model/Validator";
import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {UpdateInterviewTemplate} from "src/module/interview-template/template/core/model/UpdateInterviewTemplate";

export class UpdateInterviewTemplateValidator implements Validator<UpdateInterviewTemplate> {
    constructor(
        private validateUtils: ValidatorUtils
    ) {}

    validate(data: UpdateInterviewTemplate): void {
        this.validateUtils.validate('name', data.name)
            .required()
            .maxLength(20);
        this.validateUtils.validate('companyId', data.companyId)
            .required();
    }

}