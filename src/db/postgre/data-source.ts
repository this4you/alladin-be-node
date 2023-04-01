import {DataSource} from 'typeorm';

import {UserEntity} from '@db/postgre/entities/UserEntity';
import {CompanyEntity} from '@db/postgre/entities/CompanyEntity';
import {InterviewTemplateEntity} from "@db/postgre/entities/InterviewTemplateEntity";
import {TemplateStepEntity} from "@db/postgre/entities/TemplateStepEntity";
import {QuestionCategoryEntity} from "@db/postgre/entities/QuestionCategoryEntity";
import {StepCategoryEntity} from "@db/postgre/entities/StepCategory";
import {QuestionEntity} from "@db/postgre/entities/QuestionEntity";

import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME} from "secret";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: true,
    entities: [
        UserEntity,
        CompanyEntity,
        InterviewTemplateEntity,
        TemplateStepEntity,
        QuestionCategoryEntity,
        QuestionEntity,
        StepCategoryEntity
    ],
    subscribers: [],
    migrations: [],
});