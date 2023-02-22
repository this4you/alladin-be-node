import {Validator} from "@lib/model/Validator";
import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {CreateQuestionCategoryInStep} from "src/module/interview-template/question-category-in-step/core/model/CreateQuestionCategoryInStep";

export class CreateQuestionCategoryInStepValidator implements Validator<CreateQuestionCategoryInStep> {
    constructor(
        private validateUtils: ValidatorUtils

    ) {}

    validate(data: CreateQuestionCategoryInStep): void {
    }
}