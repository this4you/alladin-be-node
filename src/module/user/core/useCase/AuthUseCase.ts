import { ValidateCommandUseCase } from '../../../../lib/model/ValidateCommandUseCase';
import { AuthUser } from '../model/AuthUser';
import { Validator } from '../../../../lib/model/Validator';
import { NotFoundException } from '../../../../lib/model/app-exception/NotFoundException';
import { ValidationException } from '../../../../lib/model/app-exception/ValidationException';
import { PasswordValidator } from '../port/PasswordValidator';
import { UserRepository } from '../port/UserRepository';
import { TokenGenerator } from '../port/TokenGenerator';
import { Token } from '../model/Token';

export class AuthUseCase extends ValidateCommandUseCase<AuthUser, Promise<Token>> {
    constructor(
        private userRepository: UserRepository,
        private passwordValidator: PasswordValidator,
        private tokenGenerator: TokenGenerator,
        validator: Validator<AuthUser>,
    ) {
        super(validator);
    }

    protected async validatedExecute(data: AuthUser): Promise<Token> {
        const user = await this.userRepository.getUserByEmail(data.email);

        if (user === null) {
            throw new NotFoundException(`User with email ${data.email} not found.`)
        }

        const isCorrectPassword = await this.passwordValidator.compare(data.password, user.password);

        if (!isCorrectPassword) {
            throw new ValidationException('password', 'Password is not valid')
        }

        return this.tokenGenerator.generate(user);
    }
}