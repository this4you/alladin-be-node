import {Validator} from "@lib/model/Validator";
import {Question} from "@module/interview-template/question/core/model/Question";
import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

export class QuestionTextValidator implements Validator<Pick<Question, "text">> {
    constructor(
        private validateUtils: ValidatorUtils
    ) {}

    validate(data: Pick<Question, "text">): void {
        this.validateUtils.validate('text', data)
            .required()
            .maxLength(100);
    }

}