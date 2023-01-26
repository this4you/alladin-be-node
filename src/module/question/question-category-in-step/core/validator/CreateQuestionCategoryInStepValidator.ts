import {Validator} from "../../../../../lib/model/Validator";
import {CreateQuestionCategoryInStep} from "../model/CreateQuestionCategoryInStep";
import {ValidatorUtils} from "../../../../../lib/utils/ValidatorUtils";

export class CreateQuestionCategoryInStepValidator implements Validator<CreateQuestionCategoryInStep> {
    constructor(
        private validateUtils: ValidatorUtils

    ) {}

    validate(data: CreateQuestionCategoryInStep): void {
    }
}