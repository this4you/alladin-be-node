import { ValidateCommandUseCase } from '../../../../lib/model/ValidateCommandUseCase';
import { CreateCompany } from '../model/CreateCompany';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserUseCase } from '../../../user/core/useCase/CreateUserUseCase';
import { UserRole } from '../../../user/core/model/UserRole';
import { CreateCompanyRepository } from '../port/CreateCompanyRepository';
import { Validator } from '../../../../lib/model/Validator';
import { Company } from '../model/Company';

export class CreateCompanyUseCase extends ValidateCommandUseCase<CreateCompany, Promise<Company>> {
    constructor(
        private createUserUseCase: CreateUserUseCase, //TODO move similar to module service
        private createCompanyRepository: CreateCompanyRepository,
        private validateUtils: Validator<CreateCompany>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: CreateCompany): Promise<Company> {
        const company = await this.createCompanyRepository.createCompany(data);

        await this.createUserUseCase.execute({
            ...data.user,
            companyId: company.id,
            role: UserRole.ADMIN
        });

        return company;
    }
}