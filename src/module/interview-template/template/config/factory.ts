import {ValidatorUtils} from "@lib/utils/ValidatorUtils";

import {CreateInterviewTemplateValidator} from "../core/validator/CreateInterviewTemplateValidator";
import {UpdateInterviewTemplateValidator} from "src/module/interview-template/template/core/validator/UpdateInterviewTemplateValidator";
import {CreateInterviewTemplateUseCase} from "../core/useCase/CreateInterviewTemplateUseCase";
import {PostgresInterviewTemplateRepository} from "../repository/PostgresInterviewTemplateRepository";
import {GetInterviewTemplatesByCompanyUseCase} from "../core/useCase/GetInterviewTemplatesByCompanyUseCase";
import {DeleteInterviewTemplateUseCase} from "../core/useCase/DeleteInterviewTemplateUseCase";
import {UpdateInterviewTemplateUseCase} from "../core/useCase/UpdateInterviewTemplateUseCase";


export const getInterviewTemplateContext = () => {
    const interviewTemplateRepository = new PostgresInterviewTemplateRepository();
    const validationUtils = new ValidatorUtils();
    const createValidator = new CreateInterviewTemplateValidator(validationUtils);
    const updateValidator = new UpdateInterviewTemplateValidator(validationUtils);

    const createInterviewTemplateUseCase = new CreateInterviewTemplateUseCase(interviewTemplateRepository, createValidator);
    const getInterviewTemplateByCompanyUseCase = new GetInterviewTemplatesByCompanyUseCase(interviewTemplateRepository);
    const updateInterviewTemplateUseCase = new UpdateInterviewTemplateUseCase(interviewTemplateRepository, updateValidator);
    const deleteInterviewTemplateUseCase = new DeleteInterviewTemplateUseCase(interviewTemplateRepository);

    return {
        createInterviewTemplateUseCase,
        getInterviewTemplateByCompanyUseCase,
        updateInterviewTemplateUseCase,
        deleteInterviewTemplateUseCase
    }
}