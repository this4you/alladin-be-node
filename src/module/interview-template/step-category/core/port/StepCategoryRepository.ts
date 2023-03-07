import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";
import {CreateStepCategory} from "@module/interview-template/step-category/core/model/CreateStepCategory";
import {StepCategoryQuestion} from "@module/interview-template/step-category/core/model/StepCategoryQuestion";
import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";

export interface StepCategoryRepository {
    create(data: CreateStepCategory): Promise<StepCategory>
    isExists(data: CreateStepCategory): Promise<boolean>
    getStepCategory(id: string): Promise<StepCategory>
    patchPosition(patchData: PatchPosition, stepCategoryData: StepCategory): Promise<void>
    delete(data: StepCategory): Promise<void>
    getCategoryQuestionByStep(stepId: string): Promise<StepCategoryQuestion[]>
}