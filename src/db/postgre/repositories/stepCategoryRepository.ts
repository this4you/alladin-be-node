import { AppDataSource } from '../data-source';
import {StepCategoryEntity} from "@db/postgre/entities/StepCategory";

const stepCategoryRepository = AppDataSource.getRepository(StepCategoryEntity);

export default stepCategoryRepository;