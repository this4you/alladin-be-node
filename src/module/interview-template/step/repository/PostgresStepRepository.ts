import {NotFoundException} from "@lib/model/app-exception/NotFoundException";
import interviewTemplateRepository from "@db/postgre/repositories/interviewTemplateRepository";
import interviewTemplateStepRepository from "@db/postgre/repositories/interviewTemplateStepRepository";

import {StepRepository} from "../core/port/StepRepository";
import {Step} from "../core/model/Step";
import {CreateStep} from "../core/model/CreateStep";
import {InterviewTemplateStepEntity} from "@db/postgre/entities/InterviewTemplateStepEntity";
import {UpdateStep} from "../core/model/UpdateStep";

export class PostgresStepRepository implements StepRepository {
    async create(data: CreateStep): Promise<Step> {
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

    async getByInterviewTemplate(id: string): Promise<Step[]> {
        return await interviewTemplateStepRepository.findBy({
            interviewTemplate: {id: id}
        });
    }

    async update(data: UpdateStep): Promise<UpdateStep> {
        const step = await interviewTemplateStepRepository.findOneBy({
            id: data.id
        });
        if (step instanceof InterviewTemplateStepEntity) {
            await interviewTemplateStepRepository.merge(step, data);
            await interviewTemplateStepRepository.save(step);
        }
        // if (step == null) {
        //     throw new NotFoundException("Updatable Step is not found!")
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
            throw new NotFoundException("Step is not found!")
        }

        await interviewTemplateStepRepository.delete(id);
    }
}