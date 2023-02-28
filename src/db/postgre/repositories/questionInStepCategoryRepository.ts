import { AppDataSource } from '../data-source';
import {QuestionInStepCategoryEntity} from "@db/postgre/entities/QuestionInStepCategory";

const questionInStepCategoryRepository = AppDataSource.getRepository(QuestionInStepCategoryEntity);

export default questionInStepCategoryRepository;