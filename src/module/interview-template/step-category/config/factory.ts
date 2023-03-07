import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {PostgresStepCategoryRepository} from "@module/interview-template/step-category/repository/PostgresStepCategoryRepository";
import {GetStepCategoryQuestionUseCase} from "@module/interview-template/step-category/core/useCase/GetStepCategoryQuestionUseCase";
import {CreateStepCategoryUseCase} from "@module/interview-template/step-category/core/useCase/CreateStepCategoryUseCase";
import {CreateStepCategoryValidator} from "@module/interview-template/step-category/core/validator/CreateStepCategoryValidator";
import {DeleteStepCategoryUseCase} from "@module/interview-template/step-category/core/useCase/DeleteStepCategoryUseCase";
import {PatchPositionStepCategoryUseCase} from "@module/interview-template/step-category/core/useCase/PatchPositionStepCategoryUseCase";

export const getStepCategoryContext = () => {
    const stepCategory = new PostgresStepCategoryRepository();
    const validationUtils = new ValidatorUtils();
    const createValidator = new CreateStepCategoryValidator(validationUtils);

    const createStepCategoryUseCase = new CreateStepCategoryUseCase(stepCategory, createValidator);
    const getStepCategoryQuestionUseCase = new GetStepCategoryQuestionUseCase(stepCategory);
    const deleteStepCategoryUseCase = new DeleteStepCategoryUseCase(stepCategory);
    const patchPositionStepCategoryUseCase = new PatchPositionStepCategoryUseCase(stepCategory);

    return {
        createStepCategoryUseCase,
        getStepCategoryQuestionUseCase,
        deleteStepCategoryUseCase,
        patchPositionStepCategoryUseCase
    }
}