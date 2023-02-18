import {NotFoundException} from "@lib/model/app-exception/NotFoundException";
import interviewTemplateStepRepository from "@db/postgre/repositories/interviewTemplateStepRepository";

import {StepRepository} from "../core/port/StepRepository";
import {Step} from "../core/model/Step";
import {CreateStep} from "../core/model/CreateStep";
import {UpdateStep} from "../core/model/UpdateStep";

export class PostgresStepRepository implements StepRepository {
    async create(data: CreateStep): Promise<Step> {
        const step = interviewTemplateStepRepository.create({
            name: data.name,
            interviewTemplateId: data.interviewTemplateId,
        });

        await interviewTemplateStepRepository.save(step);

        return {
            id: step.id,
            name: step.name,
            interviewTemplateId: step.interviewTemplateId
        }
    }

    async isExists(name: string, interviewTemplateId: string): Promise<boolean> {
        return !!await interviewTemplateStepRepository.findOneBy( {
            interviewTemplate: {id: interviewTemplateId},
            name: name
        });
    }

    async getByInterviewTemplate(id: string): Promise<Step[]> {
        return await interviewTemplateStepRepository.findBy({
            interviewTemplateId: id
        });
    }

    async update(data: UpdateStep): Promise<Step> {
        const step = await interviewTemplateStepRepository.findOneBy({
            id: data.id
        });

        if (step == null) {
            throw new NotFoundException("Updatable Step is not found!")
        }
        await interviewTemplateStepRepository.update({id: data.id}, data)

        return {
            id: data.id,
            name: data.name,
            interviewTemplateId: data.interviewTemplateId
        };
    }

    async delete(id: string): Promise<void> {
        const step = await interviewTemplateStepRepository.findOneBy({id: id});

        if (step == null) {
            throw new NotFoundException("Step is not found!")
        }

        await interviewTemplateStepRepository.delete(id);
    }
}