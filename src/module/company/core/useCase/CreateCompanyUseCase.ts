import { ValidateCommandUseCase } from '../../../../lib/model/ValidateCommandUseCase';
import { CreateCompany } from '../model/CreateCompany';
import { CreateUserUseCase } from '../../../user/core/useCase/CreateUserUseCase';
import { UserRole } from '../../../../lib/model/UserRole';
import { CompanyRepository } from '../port/CompanyRepository';
import { Validator } from '../../../../lib/model/Validator';
import { Company } from '../model/Company';
import { UniqueException } from '../../../../lib/model/exception/UniqueException';

export class CreateCompanyUseCase extends ValidateCommandUseCase<CreateCompany, Promise<Company>> {
    constructor(
        private createUserUseCase: CreateUserUseCase, //TODO move similar to module service
        private repository: CompanyRepository,
        private validateUtils: Validator<CreateCompany>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: CreateCompany): Promise<Company> {
        const isUserExsists = await this.repository.isUserExsists(data.user.email);

        if (isUserExsists) {
            throw new UniqueException(`User with email ${data.user.email} already existed`)
        }

        const company = await this.repository.createCompany(data);

        await this.createUserUseCase.execute({
            ...data.user,
            companyId: company.id,
            role: UserRole.ADMIN
        });

        return company;
    }
}