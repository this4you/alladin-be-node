import {InterviewTemplateRepository} from "../core/port/InterviewTemplateRepository";
import {InterviewTemplate} from "../core/model/InterviewTemplate";
import {CreateInterviewTemplate} from "../core/model/CreateInterviewTemplate";
import interviewTemplateRepository from "../../../db/postgre/repositories/interviewTemplateRepository";
import companyRepository from "../../../db/postgre/repositories/companyRepository";
import {NotFoundException} from "../../../lib/model/app-exception/NotFoundException";
import {InterviewTemplateEntity} from "../../../db/postgre/entities/InterviewTemplateEntity";
import {DeleteResult} from "typeorm";

export class PostgresInterviewTemplateRepository implements InterviewTemplateRepository {

    async createInterviewTemplate(interviewTemplate: CreateInterviewTemplate): Promise<InterviewTemplate> {
        const company = await companyRepository.findOneBy({id: interviewTemplate.companyId })

        if (company == null) {
            throw new NotFoundException("Company is not found!")
        }

        const interviewTemplateEntity = interviewTemplateRepository.create({
            name: interviewTemplate.name,
            company: company,
        });

        await interviewTemplateRepository.save(interviewTemplateEntity)
        console.log('INTERVIEW-TEMPLATE WAS CREATED', interviewTemplateEntity);

        return {
            id: interviewTemplateEntity.id,
            name: interviewTemplateEntity.name,
        }
    }

    async getInterviewTemplatesByCompany(id: string): Promise<InterviewTemplateEntity[]> {
        return await interviewTemplateRepository.find({where:{id: id}});
    }

    async getInterviewTemplate(id: string): Promise<InterviewTemplateEntity> {
        return await interviewTemplateRepository.findOneOrFail({where:{id: id}});
    }

    async deleteInterviewTemplate(id: string): Promise<DeleteResult> {
        return await interviewTemplateRepository.delete(id);
    }

    async isInterviewTemplate(interviewTemplateName: string): Promise<boolean> {
        const interviewTemplate = await interviewTemplateRepository.findOneBy({name: interviewTemplateName});
        return !!interviewTemplate;
    }

}