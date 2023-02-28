import { AppDataSource } from '../data-source';
import {QuestionEntity} from "@db/postgre/entities/QuestionEntity";

const questionRepository = AppDataSource.getRepository(QuestionEntity);

export default questionRepository;