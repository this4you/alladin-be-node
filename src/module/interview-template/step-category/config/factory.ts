import {PostgresStepCategoryRepository} from "@module/interview-template/step-category/repository/PostgresStepCategoryRepository";
import {GetStepCategoryUseCase} from "@module/interview-template/step-category/core/useCase/GetStepCategoryUseCase";

export const getStepCategoryContext = () => {
    const stepCategory = new PostgresStepCategoryRepository()

    const getStepCategoryUseCase = new GetStepCategoryUseCase(stepCategory);

    return {
        getStepCategoryUseCase
    }
}