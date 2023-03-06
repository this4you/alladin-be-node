import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";
import {CreateStepCategory} from "@module/interview-template/step-category/core/model/CreateStepCategory";
import {StepCategoryQuestion} from "@module/interview-template/step-category/core/model/StepCategoryQuestion";

export interface StepCategoryRepository {
    create(data: CreateStepCategory): Promise<StepCategory>
    isExists(data: CreateStepCategory): Promise<boolean>
    // delete(id: string): Promise<void>
    // patchPosition(patchData: PatchStepCategoryPosition, stepCategoryData: StepCategoryQuestion): Promise<void>
    getByStep(stepId: string): Promise<StepCategoryQuestion[]>

}