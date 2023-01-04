import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Company } from './entities/Company';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'alladin',
    synchronize: true,
    logging: true,
    entities: [User, Company],
    subscribers: [],
    migrations: [],
})