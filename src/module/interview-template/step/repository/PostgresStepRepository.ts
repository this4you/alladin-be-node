import interviewTemplateStepRepository from "@db/postgre/repositories/interviewTemplateStepRepository";

import {StepRepository} from "../core/port/StepRepository";
import {Step} from "../core/model/Step";
import {CreateStep} from "../core/model/CreateStep";
import {UpdateStep} from "../core/model/UpdateStep";

export class PostgresStepRepository implements StepRepository {
    async create(data: CreateStep): Promise<Step> {
        const stepTableSize = await interviewTemplateStepRepository.countBy( {interviewTemplateId: data.interviewTemplateId});
        const position = stepTableSize + 1;

        const step = interviewTemplateStepRepository.create({
            name: data.name,
            interviewTemplateId: data.interviewTemplateId,
            position: position
        });

        await interviewTemplateStepRepository.save(step);

        return {...step}
    }

    async isExists(name: string, interviewTemplateId: string): Promise<boolean> {
        return !!await interviewTemplateStepRepository.findOneBy( {
            interviewTemplateId: interviewTemplateId,
            name: name
        });
    }

    async getByInterviewTemplate(interviewTemplateId: string): Promise<Step[]> {
        return await interviewTemplateStepRepository.findBy({interviewTemplateId: interviewTemplateId});
    }

    async update(data: UpdateStep): Promise<UpdateStep> {
        await interviewTemplateStepRepository.update({id: data.id}, data)

        return {
            id: data.id,
            name: data.name,
            interviewTemplateId: data.interviewTemplateId
        };
    }

    async delete(id: string): Promise<void> {
        await interviewTemplateStepRepository.delete(id);
    }
}