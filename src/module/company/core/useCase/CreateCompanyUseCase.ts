import { ValidateCommandUseCase } from '../../../../lib/model/ValidateCommandUseCase';
import { CreateCompany } from '../model/CreateCompany';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserUseCase } from '../../../user/core/useCase/CreateUserUseCase';
import { UserRole } from '../../../user/core/model/UserRole';
import { CreateCompanyRepository } from '../port/CreateCompanyRepository';
import { Validator } from '../../../../lib/model/Validator';

export class CreateCompanyUseCase extends ValidateCommandUseCase<CreateCompany, Promise<string>> {
    constructor(
        private createUserUseCase: CreateUserUseCase, //TODO move similar to module service
        private createCompanyRepository: CreateCompanyRepository,
        private validateUtils: Validator<CreateCompany>
    ) {
        super(validateUtils);
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
}