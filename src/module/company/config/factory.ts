import { CreateCompanyUseCase } from '../core/useCase/CreateCompanyUseCase';
import { getUserContext } from '../../user/config/factory';
import { ValidatorUtils } from '../../../lib/utils/ValidatorUtils';
import { CreateCompanyValidator } from '../core/validator/CreateCompanyValidator';
import { MongoCreateCompanyRepository } from '../repository/MongoCreateCompanyRepository';

export const getCompanyContext = () => {
    const { createUserUseCase } = getUserContext();
    const createCompanyRepository = new MongoCreateCompanyRepository();
    const validationUtils = new ValidatorUtils();
    const validator = new CreateCompanyValidator(validationUtils);

    const createCompanyUseCase = new CreateCompanyUseCase(createUserUseCase, createCompanyRepository, validator);

    return {
        createCompanyUseCase
    }
}