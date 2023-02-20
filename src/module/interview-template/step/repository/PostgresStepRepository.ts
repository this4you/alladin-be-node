import {Between} from "typeorm";

import {Step} from "../core/model/Step";
import {StepRepository} from "../core/port/StepRepository";
import {CreateStep} from "../core/model/CreateStep";
import {UpdateStep} from "../core/model/UpdateStep";
import {PatchPosition} from "src/module/interview-template/step/core/model/PatchPosition";

import interviewTemplateStepRepository from "@db/postgre/repositories/interviewTemplateStepRepository";

export class PostgresStepRepository implements StepRepository {
    async create(data: CreateStep): Promise<Step> {
        const stepTableSize = await interviewTemplateStepRepository.countBy( {interviewTemplateId: data.interviewTemplateId});
        const step = interviewTemplateStepRepository.create({
            name: data.name,
            interviewTemplateId: data.interviewTemplateId,
            position: stepTableSize+1
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

    async pathPosition(data: PatchPosition): Promise<void>{
        const operatedStep = await interviewTemplateStepRepository.findOneBy({id: data.id});
        const oldPosition = operatedStep?.position;

        if (oldPosition != undefined) {
            if (oldPosition > data.position)
                await interviewTemplateStepRepository.increment({
                    interviewTemplateId: operatedStep?.interviewTemplateId,
                    position: Between(data.position, oldPosition),
                }, "position", 1);
            if (oldPosition < data.position)
                await interviewTemplateStepRepository.decrement({
                    interviewTemplateId: operatedStep?.interviewTemplateId,
                    position: Between(oldPosition, data.position),
                }, "position", 1);
        }
        await interviewTemplateStepRepository.update({id: data.id}, {position: data.position})
    }
}