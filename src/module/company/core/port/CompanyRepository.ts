import { Company } from '../model/Company';
import { CreateCompany } from '../model/CreateCompany';

export interface CompanyRepository {
    createCompany(company: CreateCompany): Promise<Company>
    dropCompany(companyId: string): Promise<void>
}