import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {CreateStepValidator} from "../core/validator/CreateStepValidator";
import {PostgresStepRepository} from "../repository/PostgresStepRepository";
import {CreateStepUseCase} from "../core/useCase/CreateStepUseCase";
import {DeleteStepUseCase} from "../core/useCase/DeleteStepUseCase";
import {UpdateStepUseCase} from "../core/useCase/UpdateStepUseCase";
import {GetStepByInterviewTemplateUseCase} from "../core/useCase/GetStepByInterviewTemplateUseCase";

export const getInterviewTemplateStepContext = () => {
    const interviewTemplateStepRepository = new PostgresStepRepository();
    const validationUtils = new ValidatorUtils();
    const validator = new CreateStepValidator(validationUtils);

    const createInterviewTemplateStepUseCase = new CreateStepUseCase(interviewTemplateStepRepository, validator);
    const getInterviewTemplateStepByInterviewTemplateUseCase = new GetStepByInterviewTemplateUseCase(interviewTemplateStepRepository);
    const updateInterviewTemplateStepUseCase = new UpdateStepUseCase(interviewTemplateStepRepository);
    const deleteInterviewTemplateStepUseCase = new DeleteStepUseCase(interviewTemplateStepRepository);

    return {
        createInterviewTemplateStepUseCase,
        getInterviewTemplateStepByInterviewTemplateUseCase,
        updateInterviewTemplateStepUseCase,
        deleteInterviewTemplateStepUseCase,
    }
}