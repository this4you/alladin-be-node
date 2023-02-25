import {PostgresQuestionRepository} from "@module/interview-template/question/repository/PostgresQuestionRepository";
import {ValidatorUtils} from "@lib/utils/ValidatorUtils";
import {CreateQuestionValidator} from "@module/interview-template/question/core/validator/CreateQuestionValidator";
import {UpdateQuestionValidator} from "@module/interview-template/question/core/validator/UpdateQuestionValidator";
import {DeleteQuestionUseCase} from "@module/interview-template/question/core/useCase/DeleteQuestionUseCase";
import {UpdateQuestionUseCase} from "@module/interview-template/question/core/useCase/UpdateQuestionUseCase";
import {CreateQuestionUseCase} from "@module/interview-template/question/core/useCase/CreateQuestionUseCase";
import {
    PostgresStepQuestionRepository
} from "@module/interview-template/question/repository/PostgresStepQuestionRepository";
import {GetStepQuestionUseCase} from "@module/interview-template/question/core/useCase/GetStepQuestionUseCase";


export const getQuestionContext = () => {
    const questionRepository = new PostgresQuestionRepository();
    const stepRepository = new PostgresStepQuestionRepository();

    const validationUtils = new ValidatorUtils();
    const createValidator = new CreateQuestionValidator(validationUtils);
    const updateValidator = new UpdateQuestionValidator(validationUtils);

    const createQuestion = new CreateQuestionUseCase(questionRepository, stepRepository, createValidator);
    const updateQuestion = new UpdateQuestionUseCase(questionRepository, updateValidator);
    const deleteQuestion = new DeleteQuestionUseCase(questionRepository);
    const getStepQuestion = new GetStepQuestionUseCase(questionRepository, stepRepository);

    return {
        createQuestion,
        updateQuestion,
        deleteQuestion,
        getStepQuestion

    }
}