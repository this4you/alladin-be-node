import { AppDataSource } from '../data-source';
import {TemplateStepEntity} from "@db/postgre/entities/TemplateStepEntity";

const templateStepRepository = AppDataSource.getRepository(TemplateStepEntity);

export default templateStepRepository;