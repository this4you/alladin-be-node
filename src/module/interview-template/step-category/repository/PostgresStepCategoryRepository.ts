import {Between, MoreThan} from "typeorm";

import {StepCategoryRepository} from "@module/interview-template/step-category/core/port/StepCategoryRepository";
import {CreateStepCategory} from "@module/interview-template/step-category/core/model/CreateStepCategory";
import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";
import {StepCategoryQuestion} from "@module/interview-template/step-category/core/model/StepCategoryQuestion";
import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";
import {mapStepCategoryQuestion} from "@module/interview-template/step-category/repository/mapper/mapStepCategoryQuestion";

import stepCategoryRepository from "@db/postgre/repositories/stepCategoryRepository";
import questionRepository from "@db/postgre/repositories/questionRepository";

export class PostgresStepCategoryRepository implements StepCategoryRepository {
    async create(data: CreateStepCategory): Promise<StepCategory> {
        const stepCategoryTableSize = await stepCategoryRepository.countBy( {stepId: data.stepId});
        const stepCategory = stepCategoryRepository.create({
            stepId: data.stepId,
            questionCategoryId: data.questionCategoryId,
            position: stepCategoryTableSize+1
        });
        await stepCategoryRepository.save(stepCategory);

        return {...stepCategory}
    }

    async isExists(data: CreateStepCategory): Promise<boolean> {
        return !!await stepCategoryRepository.findOneBy( {
            stepId: data.stepId,
            questionCategoryId: data.questionCategoryId
        });
    }

    async delete(data: StepCategory): Promise<void> {
        await stepCategoryRepository.decrement({
            stepId: data.stepId,
            position: MoreThan(data.position),
        }, "position", 1);
        await stepCategoryRepository.delete(data.id);
    }

    async getStepCategory(id: string): Promise<StepCategory> {
        return await stepCategoryRepository.findOneOrFail({where:{id: id}});
    }

    async patchPosition(patchData: PatchPosition, stepCategoryData: StepCategory): Promise<void> {
        if (stepCategoryData.position > patchData.position)
            await stepCategoryRepository.increment({
                stepId: stepCategoryData.stepId,
                position: Between(patchData.position, stepCategoryData.position),
            }, "position", 1);
        if (stepCategoryData.position < patchData.position)
            await stepCategoryRepository.decrement({
                stepId: stepCategoryData.stepId,
                position: Between(stepCategoryData.position, patchData.position),
            }, "position", 1);

        await stepCategoryRepository.update(
            {id: patchData.id},
            {position: patchData.position}
        )
    }

    async getCategoryQuestionByStep(stepId: string): Promise<StepCategoryQuestion[]> {
        const stepCategory = await stepCategoryRepository.find({
            where: {
                stepId: stepId,
            },
            relations: {
                questionCategory: true
            },
            order: {
                position: "ASC"
            }
        });
        const question = await questionRepository.find({
            where: {
                stepCategory: {
                    stepId: stepId
                }
            },
            relations: {
                stepCategory: {
                    step: true
                }
            },
            order: {
                position: "ASC"
            }
        });

        return mapStepCategoryQuestion(stepCategory, question);
    }
}