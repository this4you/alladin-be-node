import { ValidateCommandUseCase } from '../../../../lib/model/ValidateCommandUseCase';
import { AuthUser } from '../model/AuthUser';
import { Validator } from '../../../../lib/model/Validator';
import { NotFoundException } from '../../../../lib/model/exception/NotFoundException';
import { ValidationException } from '../../../../lib/model/exception/ValidationException';
import { PasswordValidator } from '../port/PasswordValidator';
import { UserRepository } from '../port/UserRepository';

export class AuthUseCase extends ValidateCommandUseCase<AuthUser, Promise<string>> {
    constructor(
        private userRepository: UserRepository,
        private passwordValidator: PasswordValidator,
        validator: Validator<AuthUser>,
    ) {
        super(validator);
    }
    protected async validatedExecute(data: AuthUser): Promise<string> {
        const user = await this.userRepository.getUser(data.email);

        if (user === null) {
            throw new NotFoundException(`User with email ${data.email} not found.`)
        }

        const isCorrectPassword = await this.passwordValidator.compare(data.password, user.password);

        if (!isCorrectPassword) {
            throw new ValidationException('password', 'Password is not valid')
        }

        return JSON.stringify(user);
    }


}