import { ValidatorUtils } from '@lib/utils/ValidatorUtils';

import { CreateUserUseCase } from '../core/useCase/CreateUserUseCase';
import { BcryptPasswordUtils } from '../utils/BcryptPasswordUtils';
import { JWTVerify } from '../utils/TokenVerifier';
import { JWTGenerator } from '../utils/JWTGenerator';
import { CreateUserValidator } from '../core/validator/CreateUserValidator';
import { AuthUseCase } from '../core/useCase/AuthUseCase';
import { AuthUserValidator } from '../core/validator/AuthUserValidator';
import { VerifyTokenUseCase } from '../core/useCase/VerifyTokenUseCase';
import { GetUserUseCase } from '../core/useCase/GetUserUseCase';
import { PostgreCreateUserRepository } from '../repository/PostgreCreateUserRepository';
import { PostgreUserRepository } from '../repository/PostgreUserRepository';

export const getUserContext = () => {
    const createUserRepository = new PostgreCreateUserRepository();
    const userRepository = new PostgreUserRepository();

    const passwordHashing = new BcryptPasswordUtils();
    const validateUtils = new ValidatorUtils();
    const tokenGenerator = new JWTGenerator();
    const tokenVerifier = new JWTVerify();

    const createUserValidator = new CreateUserValidator(validateUtils);
    const authUserValidator = new AuthUserValidator(validateUtils);

    const createUserUseCase = new CreateUserUseCase(createUserRepository, passwordHashing, createUserValidator);
    const authUseCase = new AuthUseCase(userRepository, passwordHashing, tokenGenerator, authUserValidator);
    const verifyTokenUseCase = new VerifyTokenUseCase(tokenVerifier);
    const getUserUseCase = new GetUserUseCase(userRepository);

    return {
        createUserUseCase,
        authUseCase,
        verifyTokenUseCase,
        getUserUseCase
    }
}