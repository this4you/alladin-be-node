import { CreateCompanyUseCase } from '../core/useCase/CreateCompanyUseCase';
import { getUserContext } from '../../user/config/factory';
import { FakeCreateCompanyRepository } from '../repository/FakeCreateCompanyRepository';
import { ValidatorUtils } from '../../../lib/utils/ValidatorUtils';
import { CreateCompanyValidator } from '../core/validator/CreateCompanyValidator';

export const getCompanyContext = () => {
    const {createUserUseCase} = getUserContext();
    const createCompanyRepository = new FakeCreateCompanyRepository();
    const validationUtils = new ValidatorUtils();
    const validator = new CreateCompanyValidator(validationUtils);

    const createCompanyUseCase = new CreateCompanyUseCase(createUserUseCase, createCompanyRepository, validator);

    return {
        createCompanyUseCase
    }
}