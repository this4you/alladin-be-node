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
        const lastPosition = await stepCategoryRepository.countBy( {stepId: data.stepId});

        const stepCategory = stepCategoryRepository.create({
            stepId: data.stepId,
            questionCategoryId: data.questionCategoryId,
            position: lastPosition + 1
        });

        await stepCategoryRepository.save(stepCategory);

        return {...stepCategory}
    }

    async isExists(stepId: string, questionCategoryId: string): Promise<boolean> {
        return await stepCategoryRepository.exist({
            where: {
                stepId: stepId,
                questionCategoryId: questionCategoryId
            }
        });
    }

    async getStepCategory(id: string): Promise<StepCategory> {
        return await stepCategoryRepository.findOneOrFail({where:{id: id}});
    }

    async reducePositionsAfter(stepId: string, position: number): Promise<void> {
        await stepCategoryRepository.decrement({
            stepId: stepId,
            position: MoreThan(position),
        }, "position", 1);
    }

    async delete(id: string): Promise<void> {
        await stepCategoryRepository.delete(id);
    }

    async increasePositionBetween(stepId: string, currentPosition: number, newPosition: number): Promise<void> {
        await stepCategoryRepository.increment({
            stepId: stepId,
            position: Between(newPosition, currentPosition),
        }, "position", 1);
    }

    async decreasePositionBetween(stepId: string, currentPosition: number, newPosition: number): Promise<void> {
        await stepCategoryRepository.decrement({
            stepId: stepId,
            position: Between(currentPosition, newPosition),
        }, "position", 1);
    }

    async patchPosition(patchData: PatchPosition): Promise<void> {
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