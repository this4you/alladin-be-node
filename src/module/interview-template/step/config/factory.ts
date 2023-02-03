import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {CreateInterviewTemplateStepValidator} from "../core/validator/CreateInterviewTemplateStepValidator";
import {PostgresInterviewTemplateStepRepository} from "../repository/PostgresInterviewTemplateStepRepository";
import {CreateInterviewTemplateStepUseCase} from "../core/useCase/CreateInterviewTemplateStepUseCase";
import {DeleteInterviewTemplateStepUseCase} from "../core/useCase/DeleteInterviewTemplateStepUseCase";
import {UpdateInterviewTemplateStepUseCase} from "../core/useCase/UpdateInterviewTemplateStepUseCase";
import {GetInterviewTemplateStepByInterviewTemplateUseCase} from "../core/useCase/GetInterviewTemplateStepByInterviewTemplateUseCase";

export const getInterviewTemplateStepContext = () => {
    const interviewTemplateStepRepository = new PostgresInterviewTemplateStepRepository();
    const validationUtils = new ValidatorUtils();
    const validator = new CreateInterviewTemplateStepValidator(validationUtils);

    const createInterviewTemplateStepUseCase = new CreateInterviewTemplateStepUseCase(interviewTemplateStepRepository, validator);
    const getInterviewTemplateStepByInterviewTemplateUseCase = new GetInterviewTemplateStepByInterviewTemplateUseCase(interviewTemplateStepRepository);
    const updateInterviewTemplateStepUseCase = new UpdateInterviewTemplateStepUseCase(interviewTemplateStepRepository);
    const deleteInterviewTemplateStepUseCase = new DeleteInterviewTemplateStepUseCase(interviewTemplateStepRepository);

    return {
        createInterviewTemplateStepUseCase,
        getInterviewTemplateStepByInterviewTemplateUseCase,
        updateInterviewTemplateStepUseCase,
        deleteInterviewTemplateStepUseCase,
    }
}