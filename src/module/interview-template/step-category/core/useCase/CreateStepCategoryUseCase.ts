import {Validator} from "@lib/model/Validator";
import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";
import {UniqueException} from "@lib/model/app-exception/UniqueException";

import {StepCategoryRepository} from "@module/interview-template/step-category/core/port/StepCategoryRepository";
import {CreateStepCategory} from "@module/interview-template/step-category/core/model/CreateStepCategory";
import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";

export class CreateStepCategoryUseCase extends ValidateCommandUseCase<CreateStepCategory, Promise<StepCategory>> {
    constructor(
        private repository: StepCategoryRepository,
        private validateUtils: Validator<CreateStepCategory>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: CreateStepCategory): Promise<StepCategory> {
        const isStepCategory = await this.repository.isExists(data.stepId, data.questionCategoryId);

        if (isStepCategory) {
            throw new UniqueException(`StepCategory with Step: '${data.stepId}' and QuestionCategory: '${data.questionCategoryId}' already existed`);
        }

        return await this.repository.create(data);
    }
}