import { ValidateCommandUseCase } from '../../../../lib/model/ValidateCommandUseCase';
import { CreateCompany } from '../model/CreateCompany';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserUseCase } from '../../../user/core/useCase/CreateUserUseCase';
import { UserRole } from '../../../user/core/model/UserRole';
import { CreateCompanyRepository } from '../port/CreateCompanyRepository';
import { ValidatorUtils } from '../../../../lib/utils/ValidatorUtils';

export class CreateCompanyUseCase extends ValidateCommandUseCase<CreateCompany, Promise<string>> {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private createCompanyRepository: CreateCompanyRepository,
        private validateUtils: ValidatorUtils
    ) {
        super();
    }

    protected async validatedExecute(data: CreateCompany): Promise<string> {
        const companyId = uuidv4();

        await this.createCompanyRepository.createCompany({
            id: companyId,
            name: data.name
        });

        await this.createUserUseCase.execute({
            ...data.user,
            companyId: companyId,
            roleId: UserRole.ADMIN
        });

        return companyId;
    }

    protected validate(data: CreateCompany): void {
        this.validateUtils.validate('name', data.name)
            .notEmpty()
            .maxLength(50);

        this.validateUtils.validate('email', data.user.email)
            .notEmpty()
            .email();

        this.validateUtils.validate('password', data.user.password)
            .notEmpty()
            .password();

        this.validateUtils.validate('companyRoleId', data.user.companyRoleId)
            .notEmpty();
    }
}