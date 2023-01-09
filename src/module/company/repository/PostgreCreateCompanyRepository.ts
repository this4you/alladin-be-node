import { CompanyRepository } from '../core/port/CompanyRepository';
import { Company } from '../core/model/Company';
import { CreateCompany } from '../core/model/CreateCompany';
import companyRepository from '../../../db/postgre/repositories/companyRepository';
import userRepository from '../../../db/postgre/repositories/userRepository';

export class PostgreCreateCompanyRepository implements CompanyRepository {
    async createCompany(company: CreateCompany): Promise<Company> {
        const companyEntity = companyRepository.create({
            name: company.name
        });

        await companyRepository.save(companyEntity);

        console.log('COMPANY WAS CREATED', companyEntity);

        return {
            id: companyEntity.id,
            name: companyEntity.name
        }
    }

    async isUserExsists(email: string): Promise<boolean> {
        const user = await userRepository.findOneBy({email: email});
        return !!user;
    }

    async isCompanyExsists(companyName: string): Promise<boolean> {
        const company = await companyRepository.findOneBy({name: companyName});
        return !!company;
    }
}