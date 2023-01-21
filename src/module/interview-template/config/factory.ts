import {ValidatorUtils} from "../../../lib/utils/ValidatorUtils";
import {CreateInterviewTemplateValidator} from "../core/validator/CreateInterviewTemplateValidator";
import {CreateInterviewTemplateUseCase} from "../core/useCase/CreateInterviewTemplateUseCase";
import {PostgresInterviewTemplateRepository} from "../repository/PostgresInterviewTemplateRepository";
import {GetInterviewTemplatesByCompanyUseCase} from "../core/useCase/GetInterviewTemplatesByCompanyUseCase";
import {DeleteInterviewTemplateUseCase} from "../core/useCase/DeleteInterviewTemplateUseCase";
import {UpdateInterviewTemplateUseCase} from "../core/useCase/UpdateInterviewTemplateUseCase";


export const getInterviewTemplateContext = () => {
    const interviewTemplateRepository = new PostgresInterviewTemplateRepository();
    const validationUtils = new ValidatorUtils();
    const validator = new CreateInterviewTemplateValidator(validationUtils);

    const createInterviewTemplateUseCase = new CreateInterviewTemplateUseCase(interviewTemplateRepository, validator);
    const getInterviewTemplateByCompanyUseCase = new GetInterviewTemplatesByCompanyUseCase(interviewTemplateRepository);
    const updateInterviewTemplateUseCase = new UpdateInterviewTemplateUseCase(interviewTemplateRepository);
    const deleteInterviewTemplateUseCase = new DeleteInterviewTemplateUseCase(interviewTemplateRepository);

    return {
        createInterviewTemplateUseCase,
        getInterviewTemplateByCompanyUseCase,
        updateInterviewTemplateUseCase,
        deleteInterviewTemplateUseCase
    }
}