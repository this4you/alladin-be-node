import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {CreateStepValidator} from "src/module/interview-template/step/core/validator/CreateStepValidator";
import {UpdateStepValidator} from "@module/interview-template/step/core/validator/UpdateStepValidator";
import {PostgresStepRepository} from "src/module/interview-template/step/repository/PostgresStepRepository";
import {CreateStepUseCase} from "src/module/interview-template/step/core/useCase/CreateStepUseCase";
import {DeleteStepUseCase} from "src/module/interview-template/step/core/useCase/DeleteStepUseCase";
import {UpdateStepUseCase} from "src/module/interview-template/step/core/useCase/UpdateStepUseCase";
import {GetStepByInterviewTemplateUseCase} from "src/module/interview-template/step/core/useCase/GetStepByInterviewTemplateUseCase";
import {PatchPositionStepUseCase} from "@module/interview-template/step/core/useCase/PatchPositionStepUseCase";

export const getInterviewTemplateStepContext = () => {
    const interviewTemplateStepRepository = new PostgresStepRepository();
    const validationUtils = new ValidatorUtils();
    const createValidator = new CreateStepValidator(validationUtils);
    const updateValidator = new UpdateStepValidator(validationUtils);

    const createInterviewTemplateStepUseCase = new CreateStepUseCase(interviewTemplateStepRepository, createValidator);
    const getInterviewTemplateStepByInterviewTemplateUseCase = new GetStepByInterviewTemplateUseCase(interviewTemplateStepRepository);
    const updateInterviewTemplateStepUseCase = new UpdateStepUseCase(interviewTemplateStepRepository, updateValidator);
    const deleteInterviewTemplateStepUseCase = new DeleteStepUseCase(interviewTemplateStepRepository);

    const patchPositionStepUseCase = new PatchPositionStepUseCase(interviewTemplateStepRepository);

    return {
        createInterviewTemplateStepUseCase,
        getInterviewTemplateStepByInterviewTemplateUseCase,
        updateInterviewTemplateStepUseCase,
        deleteInterviewTemplateStepUseCase,
        patchPositionStepUseCase
    }
}