import {InterviewTemplateStepRepository} from "../core/port/InterviewTemplateStepRepository";
import {InterviewTemplateStep} from "../core/model/InterviewTemplateStep";
import {CreateInterviewTemplateStep} from "../core/model/CreateInterviewTemplateStep";

import {NotFoundException} from "../../../../lib/model/app-exception/NotFoundException";
import interviewTemplateRepository from "../../../../db/postgre/repositories/interviewTemplateRepository";
import interviewTemplateStepRepository from "../../../../db/postgre/repositories/interviewTemplateStepRepository";

export class PostgresInterviewTemplateStepRepository implements InterviewTemplateStepRepository {
    async create(data: CreateInterviewTemplateStep): Promise<InterviewTemplateStep> {
        const interviewTemplate = await interviewTemplateRepository.findOneBy({id: data.interviewTemplateId})

        if (interviewTemplate == null) {
            throw new NotFoundException("InterviewTemplate is not found!")
        }

        const interviewTemplateStepEntity = interviewTemplateStepRepository.create({
            name: data.name,
            interviewTemplate: interviewTemplate,
        });

        await interviewTemplateStepRepository.save(interviewTemplateStepEntity);
        console.log('INTERVIEW-TEMPLATE WAS CREATED', interviewTemplateStepEntity);

        return {
            id: interviewTemplateStepEntity.id,
            name: interviewTemplateStepEntity.name,
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

    async update(data: InterviewTemplateStep): Promise<InterviewTemplateStep> {
        const interviewTemplateStep = await interviewTemplateStepRepository.findOneBy({id: data.id});

        if (interviewTemplateStep == null) {
            throw new NotFoundException("Updatable InterviewTemplateStep is not found!")
        }

        interviewTemplateStep.name = data.name;
        const updatedInterviewTemplateStep = await interviewTemplateStepRepository.save(interviewTemplateStep);

        return {
            id: updatedInterviewTemplateStep.id,
            name: updatedInterviewTemplateStep.name
        };
    }

    async delete(id: string): Promise<void> {
        const interviewTemplateStep = await interviewTemplateStepRepository.findOneBy({id: id});

        if (interviewTemplateStep == null) {
            throw new NotFoundException("InterviewTemplateStep is not found!")
        }

        await interviewTemplateStepRepository.delete(id);
    }
}