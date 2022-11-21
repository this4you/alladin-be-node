import { CreateUserUseCase } from '../core/useCase/CreateUserUseCase';
import { BcryptPasswordUtils } from '../utils/BcryptPasswordUtils';
import { ValidatorUtils } from '../../../lib/utils/ValidatorUtils';
import { CreateUserValidator } from '../core/validator/CreateUserValidator';
import { MongoCreateUserRepository } from '../repository/MongoCreateUserRepository';
import { AuthUseCase } from '../core/useCase/AuthUseCase';
import { MongoUserRepository } from '../repository/MongoUserRepository';
import { AuthUserValidator } from '../core/validator/AuthUserValidator';
import { JWTGenerator } from '../utils/JWTGenerator';
import { VerifyTokenUseCase } from '../core/useCase/VerifyTokenUseCase';
import { JWTVerify } from '../utils/TokenVerifier';

export const getUserContext = () => {
    const createUserRepository = new MongoCreateUserRepository();
    const userRepository = new MongoUserRepository();

    const passwordHashing = new BcryptPasswordUtils();
    const validateUtils = new ValidatorUtils();
    const tokenGenerator = new JWTGenerator();
    const tokenVerifier = new JWTVerify();

    const createUserValidator = new CreateUserValidator(validateUtils);
    const authUserValidator = new AuthUserValidator(validateUtils);

    const createUserUseCase = new CreateUserUseCase(createUserRepository, passwordHashing, createUserValidator);
    const authUseCase = new AuthUseCase(userRepository, passwordHashing, tokenGenerator, authUserValidator)
    const verifyTokenUseCase = new VerifyTokenUseCase(tokenVerifier)

    return {
        createUserUseCase,
        authUseCase,
        verifyTokenUseCase
    }
}