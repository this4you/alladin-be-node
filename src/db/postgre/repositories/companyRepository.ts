import { AppDataSource } from '../data-source';
import { CompanyEntity } from '../entities/CompanyEntity';

const companyRepository = AppDataSource.getRepository(CompanyEntity);

export default companyRepository;