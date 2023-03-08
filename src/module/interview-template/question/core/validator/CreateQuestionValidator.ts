import {Validator} from "@lib/model/Validator";
import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";

export class CreateQuestionValidator implements Validator<CreateQuestion> {
    constructor(
        private validateUtils: ValidatorUtils
    ) {}

    validate(data: CreateQuestion): void {
        this.validateUtils.validate('text', data.text)
            .required()
            .maxLength(100);
        this.validateUtils.validate('stepCategoryId', data.stepCategoryId)
            .required();
    }

}