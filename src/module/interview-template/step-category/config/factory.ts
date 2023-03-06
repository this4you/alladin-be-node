import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {PostgresStepCategoryRepository} from "@module/interview-template/step-category/repository/PostgresStepCategoryRepository";
import {GetStepCategoryUseCase} from "@module/interview-template/step-category/core/useCase/GetStepCategoryUseCase";
import {CreateStepCategoryUseCase} from "@module/interview-template/step-category/core/useCase/CreateStepCategoryUseCase";
import {CreateStepCategoryValidator} from "@module/interview-template/step-category/core/validator/CreateStepCategoryValidator";

export const getStepCategoryContext = () => {
    const stepCategory = new PostgresStepCategoryRepository();
    const validationUtils = new ValidatorUtils();
    const createValidator = new CreateStepCategoryValidator(validationUtils);

    const createStepCategoryUseCase = new CreateStepCategoryUseCase(stepCategory, createValidator);
    const getStepCategoryUseCase = new GetStepCategoryUseCase(stepCategory);

    return {
        createStepCategoryUseCase,
        getStepCategoryUseCase
    }
}