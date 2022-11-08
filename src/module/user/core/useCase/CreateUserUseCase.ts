import { User } from '../model/User';
import { v4 as uuidv4 } from 'uuid';
import { CreateUser } from '../model/CreateUser';
import { ValidateCommandUseCase } from '../../../../lib/model/ValidateCommandUseCase';
import { CreateUserRepository } from '../port/CreateUserRepository';
import { PasswordHashing } from '../port/PasswordHashing';
import { Validator } from '../../../../lib/model/Validator';

export class CreateUserUseCase extends ValidateCommandUseCase<CreateUser, Promise<string>> {
    constructor(
        private repository: CreateUserRepository,
        private passwordHashing: PasswordHashing,
        validator: Validator<CreateUser>
    ) {
        super(validator);
    }

    protected override async validatedExecute (data: CreateUser): Promise<string> {
        const id = uuidv4();
        const password = this.passwordHashing.hash(data.password);
        const user: User = {
            ...data,
            id,
            password
        };

        await this.repository.createUser(user); // return id

        return id;
    }
}