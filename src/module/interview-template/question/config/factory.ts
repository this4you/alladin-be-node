import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {PostgresQuestionRepository} from "@module/interview-template/question/repository/PostgresQuestionRepository";
import {CreateQuestionValidator} from "@module/interview-template/question/core/validator/CreateQuestionValidator";
import {UpdateQuestionValidator} from "@module/interview-template/question/core/validator/UpdateQuestionValidator";
import {CreateQuestionUseCase} from "@module/interview-template/question/core/useCase/CreateQuestionUseCase";
import {UpdateQuestionUseCase} from "@module/interview-template/question/core/useCase/UpdateQuestionUseCase";
import {DeleteQuestionUseCase} from "@module/interview-template/question/core/useCase/DeleteQuestionUseCase";
import {PatchPositionQuestionUseCase} from "@module/interview-template/question/core/useCase/PatchPositionQuestionUseCase";

export const getQuestionContext = () => {

    const questionRepository = new PostgresQuestionRepository();

    const validationUtils = new ValidatorUtils();
    const createValidator = new CreateQuestionValidator(validationUtils);
    const updateValidator = new UpdateQuestionValidator(validationUtils);

    const createQuestionUseCase = new CreateQuestionUseCase(questionRepository, createValidator);
    const updateQuestionUseCase = new UpdateQuestionUseCase(questionRepository, updateValidator);
    const deleteQuestionUseCase = new DeleteQuestionUseCase(questionRepository);
    const patchPositionQuestionUseCase = new PatchPositionQuestionUseCase(questionRepository);

    return {
        createQuestionUseCase,
        updateQuestionUseCase,
        deleteQuestionUseCase,
        patchPositionQuestionUseCase
    }
}