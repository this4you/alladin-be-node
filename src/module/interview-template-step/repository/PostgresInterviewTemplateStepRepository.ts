import {InterviewTemplateStepRepository} from "../core/port/InterviewTemplateStepRepository";
import {InterviewTemplateStep} from "../core/model/InterviewTemplateStep";
import {CreateInterviewTemplateStep} from "../core/model/CreateInterviewTemplateStep";
import {NotFoundException} from "../../../lib/model/app-exception/NotFoundException";

import interviewTemplateRepository from "../../../db/postgre/repositories/interviewTemplateRepository";
import interviewTemplateStepRepository from "../../../db/postgre/repositories/interviewTemplateStepRepository";

export class PostgresInterviewTemplateStepRepository implements InterviewTemplateStepRepository {
    async create(createInterviewTemplateStep: CreateInterviewTemplateStep): Promise<InterviewTemplateStep> {
        const interviewTemplate = await interviewTemplateRepository.findOneBy({id: createInterviewTemplateStep.interviewTemplateId})

        if (interviewTemplate == null) {
            throw new NotFoundException("InterviewTemplate is not found!")
        }

        const interviewTemplateStepEntity = interviewTemplateStepRepository.create({
            name: createInterviewTemplateStep.name,
            interviewTemplate: interviewTemplate,
        });

        await interviewTemplateStepRepository.save(interviewTemplateStepEntity);
        console.log('INTERVIEW-TEMPLATE WAS CREATED', interviewTemplateStepEntity);

        return {
            id: interviewTemplateStepEntity.id,
            name: interviewTemplateStepEntity.name,
        }

    }

    async get(interviewTemplateId: string): Promise<InterviewTemplateStep[]> {
        return await interviewTemplateStepRepository.findBy({
            interviewTemplate: {id: interviewTemplateId}
        });
    }

    async delete(id: string): Promise<void> {
        await interviewTemplateStepRepository.delete(id);
    }

    async update(interviewTemplateStep: InterviewTemplateStep): Promise<InterviewTemplateStep> {
        return await interviewTemplateStepRepository.save({
            id: interviewTemplateStep.id,
            name: interviewTemplateStep.name,
        });
    }

    async isExists(name: string, interviewTemplateId: string): Promise<boolean> {
        return !!await interviewTemplateStepRepository.findOneBy( {
            interviewTemplate: {id: interviewTemplateId},
            name: name
        });
    }
}