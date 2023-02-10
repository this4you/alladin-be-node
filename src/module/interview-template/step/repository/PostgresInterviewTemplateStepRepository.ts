import {NotFoundException} from "@lib/model/app-exception/NotFoundException";
import interviewTemplateRepository from "@db/postgre/repositories/interviewTemplateRepository";
import interviewTemplateStepRepository from "@db/postgre/repositories/interviewTemplateStepRepository";

import {InterviewTemplateStepRepository} from "../core/port/InterviewTemplateStepRepository";
import {InterviewTemplateStep} from "../core/model/InterviewTemplateStep";
import {CreateInterviewTemplateStep} from "../core/model/CreateInterviewTemplateStep";
import {InterviewTemplateStepEntity} from "@db/postgre/entities/InterviewTemplateStepEntity";
import {UpdateInterviewTemplateStep} from "../core/model/UpdateInterviewTemplateStep";

export class PostgresInterviewTemplateStepRepository implements InterviewTemplateStepRepository {
    async create(data: CreateInterviewTemplateStep): Promise<InterviewTemplateStep> {
        const interviewTemplate = await interviewTemplateRepository.findOneBy({id: data.interviewTemplateId})

        if (interviewTemplate == null) {
            throw new NotFoundException("InterviewTemplate is not found!")
        }

        const step = interviewTemplateStepRepository.create({
            name: data.name,
            interviewTemplate: interviewTemplate,
        });

        await interviewTemplateStepRepository.save(step);

        return {
            id: step.id,
            name: step.name,
        }

    }

    async isExists(name: string, interviewTemplateId: string): Promise<boolean> {
        return !!await interviewTemplateStepRepository.findOneBy( {
            interviewTemplate: {id: interviewTemplateId},
            name: name
        });
    }

    async getByInterviewTemplate(id: string): Promise<InterviewTemplateStep[]> {
        return await interviewTemplateStepRepository.findBy({
            interviewTemplate: {id: id}
        });
    }

    async update(data: UpdateInterviewTemplateStep): Promise<UpdateInterviewTemplateStep> {
        const step = await interviewTemplateStepRepository.findOneBy({
            id: data.id
        });
        if (step instanceof InterviewTemplateStepEntity) {
            await interviewTemplateStepRepository.merge(step, data);
            await interviewTemplateStepRepository.save(step);
        }
        // if (step == null) {
        //     throw new NotFoundException("Updatable InterviewTemplateStep is not found!")
        // }
        // await interviewTemplateStepRepository.update({id: data.id}, data)

        return {
            id: data.id,
            name: data.name,
            interviewTemplateId: data.interviewTemplateId
        };
    }

    async delete(id: string): Promise<void> {
        const step = await interviewTemplateStepRepository.findOneBy({id: id});

        if (step == null) {
            throw new NotFoundException("InterviewTemplateStep is not found!")
        }

        await interviewTemplateStepRepository.delete(id);
    }
}