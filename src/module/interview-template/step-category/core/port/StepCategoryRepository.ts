import {StepFrame} from "@module/interview-template/step-category/core/model/StepFrame";
import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";

export interface StepCategoryRepository {
    getFrame(data: Pick<StepCategory, "stepId">): Promise<StepFrame[]>
}