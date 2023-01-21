import { AppDataSource } from '../data-source';
import {InterviewTemplateStepEntity} from "../entities/InterviewTemplateStepEntity";

const interviewTemplateStepRepository = AppDataSource.getRepository(InterviewTemplateStepEntity);

export default interviewTemplateStepRepository;