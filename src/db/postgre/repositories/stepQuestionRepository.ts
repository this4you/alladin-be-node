import { AppDataSource } from '../data-source';
import {StepQuestionEntity} from "@db/postgre/entities/StepQuestionEntity";

const stepQuestionRepository = AppDataSource.getRepository(StepQuestionEntity);

export default stepQuestionRepository;