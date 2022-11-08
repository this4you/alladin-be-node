import { CreateCompanyRepository } from '../core/port/CreateCompanyRepository';
import { Company } from '../core/model/Company';
import { CreateCompany } from '../core/model/CreateCompany';

export class FakeCreateCompanyRepository implements CreateCompanyRepository {
    async createCompany(company: CreateCompany): Promise<Company> {
        console.log('COMPANY WAS CREATED', company);

        return {
            ...company,
            id: '1212333123'
        }
    }
}