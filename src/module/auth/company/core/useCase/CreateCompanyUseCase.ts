import { UserRole } from '@lib/model/UserRole';
import { Validator } from '@lib/model/Validator';
import { UniqueException } from '@lib/model/app-exception/UniqueException';
import { ValidateCommandUseCase } from '@lib/model/ValidateCommandUseCase';

import { CreateUserUseCase } from '../../../user/core/useCase/CreateUserUseCase';
import { CreateCompany } from '../model/CreateCompany';
import { CompanyRepository } from '../port/CompanyRepository';
import { Company } from '../model/Company';

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

        const isCompanyExsists = await this.repository.isCompanyExsists(data.name);

        if (isCompanyExsists) {
            throw new UniqueException(`Company name ${data.name} already existed`)
        }

        const company = await this.repository.createCompany(data);

        await this.createUserUseCase.execute({ //send event
            ...data.user,
            companyId: company.id,
            role: UserRole.ADMIN
        });

        return company;
    }
}