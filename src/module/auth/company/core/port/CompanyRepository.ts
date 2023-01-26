import { Company } from '../model/Company';
import { CreateCompany } from '../model/CreateCompany';

export interface CompanyRepository {
    createCompany(company: CreateCompany): Promise<Company>
    isUserExsists(email: string): Promise<boolean>
    isCompanyExsists(companyName: string): Promise<boolean>
}