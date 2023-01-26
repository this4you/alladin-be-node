import {ValidatorUtils} from "../../../../../lib/utils/ValidatorUtils";
import {PostgresQuestionCategoryInStepRepository} from "../repository/PostgresQuestionCategoryInStepRepository";
import {CreateQuestionCategoryInStepUseCase} from "../core/useCase/CreateQuestionCategoryInStepUseCase";
import {CreateQuestionCategoryInStepValidator} from "../core/validator/CreateQuestionCategoryInStepValidator";
import {DeleteQuestionCategoryInStepUseCase} from "../core/useCase/DeleteQuestionCategoryInStepUseCase";
import {GetQuestionCategoryInStepUseCase} from "../core/useCase/GetQuestionCategoryInStepUseCase";

export const getQuestionCategoryInStepContext = () => {
    const questionCategoryInStepRepository = new PostgresQuestionCategoryInStepRepository();
    const validationUtils = new ValidatorUtils();
    const validator = new CreateQuestionCategoryInStepValidator(validationUtils);

    const createQuestionCategoryInStepUseCase = new CreateQuestionCategoryInStepUseCase(questionCategoryInStepRepository, validator);
    const deleteQuestionCategoryInStepUseCase = new DeleteQuestionCategoryInStepUseCase(questionCategoryInStepRepository);
    const getQuestionCategoriesInStepUseCase = new GetQuestionCategoryInStepUseCase(questionCategoryInStepRepository);

    return {
        createQuestionCategoryInStepUseCase,
        deleteQuestionCategoryInStepUseCase,
        getQuestionCategoriesInStepUseCase
    }
}