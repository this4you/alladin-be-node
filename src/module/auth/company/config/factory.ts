import { CreateCompanyUseCase } from '../core/useCase/CreateCompanyUseCase';
import { getUserContext } from '../../user/config/factory';
import { ValidatorUtils } from '../../../../lib/utils/ValidatorUtils';
import { CreateCompanyValidator } from '../core/validator/CreateCompanyValidator';
import { PostgreCreateCompanyRepository } from '../repository/PostgreCreateCompanyRepository';

export const getCompanyContext = () => {
    const { createUserUseCase } = getUserContext();
    const createCompanyRepository = new PostgreCreateCompanyRepository();
    const validationUtils = new ValidatorUtils();
    const validator = new CreateCompanyValidator(validationUtils);

    const createCompanyUseCase = new CreateCompanyUseCase(createUserUseCase, createCompanyRepository, validator);

    return {
        createCompanyUseCase
    }
}