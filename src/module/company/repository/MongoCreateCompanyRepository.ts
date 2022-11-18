import { CompanyRepository } from '../core/port/CompanyRepository';
import { Company } from '../core/model/Company';
import { CreateCompany } from '../core/model/CreateCompany';
import { CompanyEntity } from '../../../db/mongo/schemas/Company';
import { UserEntity } from '../../../db/mongo/schemas/User';

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

    async isUserExsists(email: string): Promise<boolean> {
        const user = await UserEntity.findOne({email: email}).exec();
        return !!user;
    }
}