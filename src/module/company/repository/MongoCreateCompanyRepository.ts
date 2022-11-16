import { CompanyRepository } from '../core/port/CompanyRepository';
import { Company } from '../core/model/Company';
import { CreateCompany } from '../core/model/CreateCompany';
import { CompanyEntity } from '../../../db/mongo/schemas/Company';

export class MongoCreateCompanyRepository implements CompanyRepository {
    async createCompany(company: CreateCompany): Promise<Company> {
        const companyEntity = new CompanyEntity({
            name: company.name
        });

        await companyEntity.save();

        console.log('COMPANY WAS CREATED', companyEntity);

        return {
            id: companyEntity.id,
            name: companyEntity.name
        }
    }

    async dropCompany(companyId: string): Promise<void> {
        await CompanyEntity.findByIdAndDelete(companyId).exec()
    }
}