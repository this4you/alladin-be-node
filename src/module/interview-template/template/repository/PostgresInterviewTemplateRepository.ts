import {NotFoundException} from "@lib/model/app-exception/NotFoundException";
import companyRepository from "@db/postgre/repositories/companyRepository";
import interviewTemplateRepository from "@db/postgre/repositories/interviewTemplateRepository";

import {InterviewTemplateRepository} from "../core/port/InterviewTemplateRepository";
import {InterviewTemplate} from "../core/model/InterviewTemplate";
import {CreateInterviewTemplate} from "../core/model/CreateInterviewTemplate";

export class PostgresInterviewTemplateRepository implements InterviewTemplateRepository {

    async create(data: CreateInterviewTemplate): Promise<InterviewTemplate> {
        const company = await companyRepository.findOneBy({id: data.companyId });

        if (company == null) {
            throw new NotFoundException("Company is not found!")
        }

        const interviewTemplate = interviewTemplateRepository.create({
            name: data.name,
            company: company,
        });

        await interviewTemplateRepository.save(interviewTemplate);
        console.log('INTERVIEW-TEMPLATE WAS CREATED', interviewTemplate);

        return {
            id: interviewTemplate.id,
            name: interviewTemplate.name
        }
    }

    async isExists(name: string, companyId: string): Promise<boolean> {
        return !!await interviewTemplateRepository.findOneBy({
            company: {id: companyId},
            name: name
        });
    }

    async getByCompany(id: string): Promise<InterviewTemplate[]> {
        return await interviewTemplateRepository.findBy({company: {id: id}});
    }

    async update(data: InterviewTemplate): Promise<InterviewTemplate> {
        const updatableInterviewTemplate = await interviewTemplateRepository.findOneBy({id: data.id});

        if (updatableInterviewTemplate == null) {
            throw new NotFoundException("Updatable InterviewTemplate is not found!")
        }

        updatableInterviewTemplate.name = data.name;
        const updatedInterviewTemplate = await interviewTemplateRepository.save(updatableInterviewTemplate);

        return {
            id: updatedInterviewTemplate.id,
            name: updatableInterviewTemplate.name
        }
    }

    async delete(id: string): Promise<void> {
        const interviewTemplate = await interviewTemplateRepository.findOneBy({id: id});

        if (interviewTemplate == null) {
            throw new NotFoundException("InterviewTemplate is not found!")
        }

        await interviewTemplateRepository.delete(id);
    }

}