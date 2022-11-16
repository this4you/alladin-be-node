import { CreateUserUseCase } from '../core/useCase/CreateUserUseCase';
import { BcryptPasswordHashing } from '../utils/BcryptPasswordHashing';
import { ValidatorUtils } from '../../../lib/utils/ValidatorUtils';
import { CreateUserValidator } from '../core/validator/CreateUserValidator';
import { MongoCreateUserRepository } from '../repository/MongoCreateUserRepository';

export const getUserContext = () => {
    const createUserRepository = new MongoCreateUserRepository();
    const passwordHashing = new BcryptPasswordHashing();
    const validateUtils = new ValidatorUtils();
    const validator = new CreateUserValidator(validateUtils);

    const createUserUseCase = new CreateUserUseCase(createUserRepository, passwordHashing, validator);

    return {
        createUserUseCase
    }
}