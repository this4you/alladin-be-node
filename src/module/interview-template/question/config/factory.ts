import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {QuestionTextValidator} from "@module/interview-template/question/core/validator/QuestionTextValidator";
import {CreateQuestionUseCase} from "@module/interview-template/question/core/useCase/CreateQuestionUseCase";
import {GetQuestionsUseCase} from "@module/interview-template/question/core/useCase/GetQuestionsUseCase";
import {PostgresQuestionRepository} from "@module/interview-template/question/repository/PostgresQuestionRepository";



export const getQuestionContext = () => {

    const questionRepository = new PostgresQuestionRepository();

    const validationUtils = new ValidatorUtils();
    const textValidator = new QuestionTextValidator(validationUtils);

    const createQuestion = new CreateQuestionUseCase(questionRepository, textValidator);
    const getQuestion = new GetQuestionsUseCase(questionRepository);

    return {
        createQuestion,
        getQuestion
    }
}