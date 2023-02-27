import {DataSource} from 'typeorm';

import {UserEntity} from './entities/UserEntity';
import {CompanyEntity} from './entities/CompanyEntity';
import {InterviewTemplateEntity} from "./entities/InterviewTemplateEntity";
import {StepEntity} from "src/db/postgre/entities/StepEntity";
import {QuestionCategoryEntity} from "./entities/QuestionCategoryEntity";
import {QuestionEntity} from "./entities/QuestionEntity";
import {QuestionInStepCategoryEntity} from "@db/postgre/entities/QuestionInStepCategory";
import {StepCategoryEntity} from "@db/postgre/entities/StepCategory";

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
        StepEntity,
        QuestionCategoryEntity,
        QuestionEntity,
        QuestionInStepCategoryEntity,
        StepCategoryEntity
    ],
    subscribers: [],
    migrations: [],
})