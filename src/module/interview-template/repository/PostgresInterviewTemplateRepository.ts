import {InterviewTemplateRepository} from "../core/port/InterviewTemplateRepository";
import {InterviewTemplate} from "../core/model/InterviewTemplate";
import {CreateInterviewTemplate} from "../core/model/CreateInterviewTemplate";
import {NotFoundException} from "../../../lib/model/app-exception/NotFoundException";

import interviewTemplateRepository from "../../../db/postgre/repositories/interviewTemplateRepository";
import companyRepository from "../../../db/postgre/repositories/companyRepository";

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

    async getInterviewTemplatesByCompany(companyId: string): Promise<InterviewTemplate[]> {
        return await interviewTemplateRepository.findBy({company: {id: companyId}});
    }

    async getInterviewTemplate(id: string): Promise<InterviewTemplate> {
        return await interviewTemplateRepository.findOneOrFail({where:{id: id}});
    }

    async deleteInterviewTemplate(id: string): Promise<void> {
        await interviewTemplateRepository.delete(id);
    }

    async updateInterviewTemplate(interviewTemplate: InterviewTemplate): Promise<InterviewTemplate> {
        return await interviewTemplateRepository.save({
            id: interviewTemplate.id,
            name: interviewTemplate.name,
        });
    }

    async isInterviewTemplateByName(name: string): Promise<boolean> {
        return !!await interviewTemplateRepository.findOneBy({name: name});
    }

}