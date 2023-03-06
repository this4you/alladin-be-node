import {Between, MoreThan} from "typeorm";

import {Step} from "src/module/interview-template/step/core/model/Step";
import {StepRepository} from "src/module/interview-template/step/core/port/StepRepository";
import {CreateStep} from "src/module/interview-template/step/core/model/CreateStep";
import {UpdateStep} from "src/module/interview-template/step/core/model/UpdateStep";
import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";

import interviewTemplateStepRepository from "@db/postgre/repositories/templateStepRepository";

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

    async getStep(id: string): Promise<Step> {
        return await interviewTemplateStepRepository.findOneOrFail({where:{id: id}});
    }

    async update(data: UpdateStep): Promise<UpdateStep> {
        await interviewTemplateStepRepository.update({id: data.id}, data)

        return {...data};
    }

    async delete(data: Step): Promise<void> {
        await interviewTemplateStepRepository.decrement({
            interviewTemplateId: data.interviewTemplateId,
            position: MoreThan(data.position),
        }, "position", 1);
        await interviewTemplateStepRepository.delete(data.id);
    }

    async patchPosition(patchData: PatchPosition, stepData: Step): Promise<void>{
        if (stepData.position > patchData.position)
            await interviewTemplateStepRepository.increment({
                interviewTemplateId: stepData.interviewTemplateId,
                position: Between(patchData.position, stepData.position),
            }, "position", 1);
        if (stepData.position < patchData.position)
            await interviewTemplateStepRepository.decrement({
                interviewTemplateId: stepData.interviewTemplateId,
                position: Between(stepData.position, patchData.position),
            }, "position", 1);

        await interviewTemplateStepRepository.update(
            {id: patchData.id},
            {position: patchData.position}
        )
    }
}