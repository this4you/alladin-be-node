import { AppDataSource } from '../data-source';
import {QuestionCategoryInStepEntity} from "../entities/QuestionCategoryInStepEntity";

const questionCategoryInStepRepository = AppDataSource.getRepository(QuestionCategoryInStepEntity);

export default questionCategoryInStepRepository;