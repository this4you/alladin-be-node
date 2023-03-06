import {Validator} from "@lib/model/Validator";
import {ValidatorUtils} from "@lib/utils/ValidatorUtils";
import {CreateStepCategory} from "@module/interview-template/step-category/core/model/CreateStepCategory";

export class CreateStepCategoryValidator implements Validator<CreateStepCategory> {
    constructor(
        private validateUtils: ValidatorUtils
    ) {}

    validate(data: CreateStepCategory): void {
        this.validateUtils.validate('stepId', data.stepId)
            .required();
        this.validateUtils.validate('questionCategoryId', data.questionCategoryId)
            .required();
    }
}