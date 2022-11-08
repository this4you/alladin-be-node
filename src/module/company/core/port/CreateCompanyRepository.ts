import { Company } from '../model/Company';
import { CreateCompany } from '../model/CreateCompany';

export interface CreateCompanyRepository {
    createCompany(company: CreateCompany): Promise<Company>
}