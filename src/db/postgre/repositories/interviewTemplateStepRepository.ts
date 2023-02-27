import { AppDataSource } from '../data-source';
import {StepEntity} from "src/db/postgre/entities/StepEntity";

const interviewTemplateStepRepository = AppDataSource.getRepository(StepEntity);

export default interviewTemplateStepRepository;