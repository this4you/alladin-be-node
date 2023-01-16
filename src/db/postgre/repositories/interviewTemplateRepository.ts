import { AppDataSource } from '../data-source';
import { InterviewTemplateEntity } from '../entities/InterviewTemplateEntity';

const interviewTemplateRepository = AppDataSource.getRepository(InterviewTemplateEntity);

export default interviewTemplateRepository;