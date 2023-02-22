import {Validator} from "@lib/model/Validator";
import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {UpdateQuestion} from "@module/interview-template/question/core/model/UpdateQuestion";

export class UpdateQuestionValidator implements Validator<UpdateQuestion> {
    constructor(
        private validateUtils: ValidatorUtils
    ) {}

    validate(data: UpdateQuestion): void {
        this.validateUtils.validate('text', data.text)
            .required()
            .maxLength(100);
        this.validateUtils.validate('questionCategoryId', data.questionCategoryId)
            .required();
    }

}