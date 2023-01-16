import { DataSource } from 'typeorm';
import { UserEntity } from './entities/UserEntity';
import { CompanyEntity } from './entities/CompanyEntity';
import {InterviewTemplateEntity} from "./entities/InterviewTemplateEntity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'alladin',
    synchronize: true,
    logging: true,
    entities: [UserEntity, CompanyEntity, InterviewTemplateEntity],
    subscribers: [],
    migrations: [],
})