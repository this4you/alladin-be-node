import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";

export interface StepCategoryRepository {
    getStepCategories(stepId: string): Promise<StepCategory[]>
}