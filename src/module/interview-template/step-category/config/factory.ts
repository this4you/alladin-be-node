import {PostgresStepCategoryRepository} from "@module/interview-template/step-category/repository/PostgresStepCategoryRepository";
import {GetStepCategoryUseCase} from "@module/interview-template/step-category/core/useCase/GetStepCategoryUseCase";

export const getStepFrameContext = () => {
    const stepFrame = new PostgresStepCategoryRepository()

    const getStepCategoryUseCase = new GetStepCategoryUseCase(stepFrame);

    return {
        getStepCategoryUseCase
    }
}