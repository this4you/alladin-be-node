import {PostgresQuestionRepository} from "@module/interview-template/question/repository/PostgresQuestionRepository";
import {ValidatorUtils} from "@lib/utils/ValidatorUtils";
import {CreateQuestionValidator} from "@module/interview-template/question/core/validator/CreateQuestionValidator";
import {UpdateQuestionValidator} from "@module/interview-template/question/core/validator/UpdateQuestionValidator";
import {DeleteQuestionUseCase} from "@module/interview-template/question/core/useCase/DeleteQuestionUseCase";
import {UpdateQuestionUseCase} from "@module/interview-template/question/core/useCase/UpdateQuestionUseCase";
import {CreateQuestionUseCase} from "@module/interview-template/question/core/useCase/CreateQuestionUseCase";


export const getQuestionContext = () => {
    const questionRepository = new PostgresQuestionRepository();
    const validationUtils = new ValidatorUtils();
    const createValidator = new CreateQuestionValidator(validationUtils);
    const updateValidator = new UpdateQuestionValidator(validationUtils);

    const createQuestion = new CreateQuestionUseCase(questionRepository, createValidator);
    const updateQuestion = new UpdateQuestionUseCase(questionRepository, updateValidator);
    const deleteQuestion = new DeleteQuestionUseCase(questionRepository);
    return {
        createQuestion,
        updateQuestion,
        deleteQuestion
    }
}