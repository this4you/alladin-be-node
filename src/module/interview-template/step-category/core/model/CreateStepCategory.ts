import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";

export type CreateStepCategory = Omit<StepCategory, "id" | "position">