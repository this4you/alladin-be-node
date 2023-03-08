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
        return await interviewTemplateStepRepository.exist( {
            where: {
                interviewTemplateId: interviewTemplateId,
                name: name
            }
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

    async reducePositionsAfter(interviewTemplateId: string, position: number): Promise<void> {
        await interviewTemplateStepRepository.decrement({
            interviewTemplateId: interviewTemplateId,
            position: MoreThan(position),
        }, "position", 1);
    }

    async delete(id: string): Promise<void> {
        await interviewTemplateStepRepository.delete(id);
    }

    async increasePositionBetween(interviewTemplateId: string, currentPosition: number, newPosition: number): Promise<void> {
        await interviewTemplateStepRepository.increment({
            interviewTemplateId: interviewTemplateId,
            position: Between(newPosition, currentPosition),
        }, "position", 1);
    }

    async decreasePositionBetween(interviewTemplateId: string, currentPosition: number, newPosition: number): Promise<void> {
        await interviewTemplateStepRepository.decrement({
            interviewTemplateId: interviewTemplateId,
            position: Between(currentPosition, newPosition),
        }, "position", 1);
    }

    async patchPosition(patchData: PatchPosition): Promise<void>{
        await interviewTemplateStepRepository.update(
            {id: patchData.id},
            {position: patchData.position}
        )
    }
}