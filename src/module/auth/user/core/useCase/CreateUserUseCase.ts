import { User } from '../model/User';
import { CreateUser } from '../model/CreateUser';
import { ValidateCommandUseCase } from '../../../../../lib/model/ValidateCommandUseCase';
import { CreateUserRepository } from '../port/CreateUserRepository';
import { PasswordHashing } from '../port/PasswordHashing';
import { Validator } from '../../../../../lib/model/Validator';
import { UniqueException } from '../../../../../lib/model/app-exception/UniqueException';

export class CreateUserUseCase extends ValidateCommandUseCase<CreateUser, Promise<Omit<User, 'password'>>> {
    constructor(
        private repository: CreateUserRepository,
        private passwordHashing: PasswordHashing,
        validator: Validator<CreateUser>
    ) {
        super(validator);
    }

    protected override async validatedExecute(data: CreateUser): Promise<Omit<User, 'password'>> {
        const password = await this.passwordHashing.hash(data.password);
        const isUserExsists = await this.repository.isUserExsists(data.email);

        if (isUserExsists) {
            throw new UniqueException(`User with email ${data.email} already existed`)
        }

        const user = {
            ...data,
            password
        };

        return await this.repository.createUser(user);
    }
}