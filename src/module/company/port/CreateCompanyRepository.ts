import { Company } from '../core/model/Company';

export interface CreateCompanyRepository {
    createCompany(company: Company): Promise<void>
}