import interviewTemplateRepository from "@db/postgre/repositories/interviewTemplateRepository";

import {InterviewTemplateRepository} from "../core/port/InterviewTemplateRepository";
import {InterviewTemplate} from "../core/model/InterviewTemplate";
import {CreateInterviewTemplate} from "../core/model/CreateInterviewTemplate";
import {UpdateInterviewTemplate} from "../core/model/UpdateInterviewTemplate";

export class PostgresInterviewTemplateRepository implements InterviewTemplateRepository {

    async create(data: CreateInterviewTemplate): Promise<InterviewTemplate> {

        const interviewTemplate = interviewTemplateRepository.create({
            name: data.name,
            companyId: data.companyId,
        });

        await interviewTemplateRepository.save(interviewTemplate);

        return {...interviewTemplate}
    }

    async isExists(name: string, companyId: string): Promise<boolean> {
        return await interviewTemplateRepository.exist({
            where: {
                companyId: companyId,
                name: name
            },
        });
    }

    async getByCompany(id: string): Promise<InterviewTemplate[]> {
        return await interviewTemplateRepository.findBy({companyId: id});
    }

    async update(data: UpdateInterviewTemplate): Promise<UpdateInterviewTemplate> {
        await interviewTemplateRepository.update({id: data.id}, data);

        return {...data}
    }

    async delete(id: string): Promise<void> {
        await interviewTemplateRepository.delete(id);
    }

}