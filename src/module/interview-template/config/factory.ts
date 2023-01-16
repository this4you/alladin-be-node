import {ValidatorUtils} from "../../../lib/utils/ValidatorUtils";
import {CreateInterviewTemplateValidator} from "../core/validator/CreateInterviewTemplateValidator";
import {CreateInterviewTemplateUseCase} from "../core/useCase/CreateInterviewTemplateUseCase";
import {PostgresInterviewTemplateRepository} from "../repository/PostgresInterviewTemplateRepository";
import {GetInterviewTemplatesByCompanyUseCase} from "../core/useCase/GetInterviewTemplatesByCompanyUseCase";
import {GetInterviewTemplateUseCase} from "../core/useCase/GetInterviewTemplateUseCase";
import {DeleteInterviewTemplateUseCase} from "../core/useCase/DeleteInterviewTemplateUseCase";


export const getInterviewTemplateContext = () => {
    const interviewTemplateRepository = new PostgresInterviewTemplateRepository();
    const validationUtils = new ValidatorUtils();
    const validator = new CreateInterviewTemplateValidator(validationUtils);

    const createInterviewTemplateUseCase = new CreateInterviewTemplateUseCase(interviewTemplateRepository, validator);
    const getInterviewTemplateUseCase = new GetInterviewTemplateUseCase(interviewTemplateRepository);
    const getInterviewTemplateByCompanyUseCase = new GetInterviewTemplatesByCompanyUseCase(interviewTemplateRepository);
    const deleteInterviewTemplateUseCase = new DeleteInterviewTemplateUseCase(interviewTemplateRepository);

    return {
        createInterviewTemplateUseCase,
        getInterviewTemplateUseCase,
        getInterviewTemplateByCompanyUseCase,
        deleteInterviewTemplateUseCase
    }
}