import {DataSource} from 'typeorm';

import {UserEntity} from '@db/postgre/entities/UserEntity';
import {CompanyEntity} from '@db/postgre/entities/CompanyEntity';
import {InterviewTemplateEntity} from "@db/postgre/entities/InterviewTemplateEntity";
import {TemplateStepEntity} from "@db/postgre/entities/TemplateStepEntity";
import {QuestionCategoryEntity} from "@db/postgre/entities/QuestionCategoryEntity";
import {StepCategoryEntity} from "@db/postgre/entities/StepCategory";
import {QuestionEntity} from "@db/postgre/entities/QuestionEntity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'alladin',
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
})