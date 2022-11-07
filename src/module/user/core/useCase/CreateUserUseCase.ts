import { User } from '../model/User';
import { v4 as uuidv4 } from 'uuid';
import { CreateUser } from '../model/CreateUser';
import { ValidateCommandUseCase } from '../../../../lib/model/ValidateCommandUseCase';
import { ValidatorUtils } from '../../../../lib/utils/ValidatorUtils';
import { CreateUserRepository } from '../port/CreateUserRepository';
import { PasswordHashing } from '../port/PasswordHashing';

export class CreateUserUseCase extends ValidateCommandUseCase<CreateUser, Promise<string>> {
    constructor(
        private repository: CreateUserRepository,
        private passwordHashing: PasswordHashing,
        private validateUtils: ValidatorUtils
    ) {
        super();
    }

    protected override async validatedExecute (data: CreateUser): Promise<string> {
        const id = uuidv4();
        const password = this.passwordHashing.hash(data.password);
        const user: User = {
            ...data,
            id,
            password
        };

        await this.repository.createUser(user);

        return id;
    }

    protected validate(data: CreateUser): void {
        this.validateUtils.validate('name', data.name)
            .notEmpty()
            .maxLength(50);

        this.validateUtils.validate('email', data.email)
            .notEmpty()
            .email();

        this.validateUtils.validate('password', data.password)
            .notEmpty()
            .password();

        this.validateUtils.validate('companyId', data.companyId)
            .notEmpty();

        this.validateUtils.validate('roleId', data.roleId)
            .notEmpty();

        this.validateUtils.validate('companyRoleId', data.companyRoleId)
            .notEmpty();
    }

}