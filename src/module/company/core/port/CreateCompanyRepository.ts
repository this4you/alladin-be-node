import { Company } from '../model/Company';

export interface CreateCompanyRepository {
    createCompany(company: Company): Promise<void>
}