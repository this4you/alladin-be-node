import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";
import {CreateStepCategory} from "@module/interview-template/step-category/core/model/CreateStepCategory";
import {StepCategoryQuestion} from "@module/interview-template/step-category/core/model/StepCategoryQuestion";
import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";

export interface StepCategoryRepository {
    create(data: CreateStepCategory): Promise<StepCategory>
    isExists(stepId: string, questionCategoryId: string): Promise<boolean>
    getStepCategory(id: string): Promise<StepCategory>
    getCategoryQuestionByStep(stepId: string): Promise<StepCategoryQuestion[]>
    reducePositionsAfter(stepId: string, position: number): Promise<void>
    delete(id: string): Promise<void>
    patchPosition(patchData: PatchPosition): Promise<void>
    increasePositionBetween(stepId: string, currentPosition: number, newPosition: number): Promise<void>
    decreasePositionBetween(stepId: string, currentPosition: number, newPosition: number): Promise<void>

}