import { AppDataSource } from '../data-source';
import {QuestionCategoryEntity} from "../entities/QuestionCategoryEntity";

const questionCategoryRepository = AppDataSource.getRepository(QuestionCategoryEntity);

export default questionCategoryRepository;