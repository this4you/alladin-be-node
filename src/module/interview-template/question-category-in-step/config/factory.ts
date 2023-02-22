import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {PostgresQuestionCategoryInStepRepository} from "src/module/interview-template/question-category-in-step/repository/PostgresQuestionCategoryInStepRepository";
import {CreateQuestionCategoryInStepUseCase} from "src/module/interview-template/question-category-in-step/core/useCase/CreateQuestionCategoryInStepUseCase";
import {CreateQuestionCategoryInStepValidator} from "src/module/interview-template/question-category-in-step/core/validator/CreateQuestionCategoryInStepValidator";
import {DeleteQuestionCategoryInStepUseCase} from "src/module/interview-template/question-category-in-step/core/useCase/DeleteQuestionCategoryInStepUseCase";
import {GetQuestionCategoryInStepUseCase} from "src/module/interview-template/question-category-in-step/core/useCase/GetQuestionCategoryInStepUseCase";

export const getQuestionCategoryInStepContext = () => {
    const questionCategoryInStepRepository = new PostgresQuestionCategoryInStepRepository();
    const validationUtils = new ValidatorUtils();
    const validator = new CreateQuestionCategoryInStepValidator(validationUtils);

    const createQuestionCategoryInStepUseCase = new CreateQuestionCategoryInStepUseCase(questionCategoryInStepRepository, validator);
    const getQuestionCategoriesInStepUseCase = new GetQuestionCategoryInStepUseCase(questionCategoryInStepRepository);
    const deleteQuestionCategoryInStepUseCase = new DeleteQuestionCategoryInStepUseCase(questionCategoryInStepRepository);

    return {
        createQuestionCategoryInStepUseCase,
        getQuestionCategoriesInStepUseCase,
        deleteQuestionCategoryInStepUseCase
    }
}