import { CreateCompanyUseCase } from '../core/useCase/CreateCompanyUseCase';
import { getUserContext } from '../../user/config/factory';
import { FakeCreateCompanyRepository } from '../repository/FakeCreateCompanyRepository';
import { ValidatorUtils } from '../../../lib/utils/ValidatorUtils';

export const getCompanyContext = () => {
    const {createUserUseCase} = getUserContext();
    const createCompanyRepository = new FakeCreateCompanyRepository();
    const validationUtils = new ValidatorUtils();

    const createCompanyUseCase = new CreateCompanyUseCase(createUserUseCase, createCompanyRepository, validationUtils);

    return {
        createCompanyUseCase
    }
}