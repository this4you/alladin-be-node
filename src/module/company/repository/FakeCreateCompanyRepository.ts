import { CreateCompanyRepository } from '../core/port/CreateCompanyRepository';
import { Company } from '../core/model/Company';

export class FakeCreateCompanyRepository implements CreateCompanyRepository {
    async createCompany(company: Company): Promise<void> {
        console.log('COMPANY WAS CREATED', company);
    }
}