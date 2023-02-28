import questionInStepCategoryRepository from "@db/postgre/repositories/questionInStepCategoryRepository";

import {StepCategoryRepository} from "@module/interview-template/step-category/core/port/StepCategoryRepository";
import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";
import {mapQuestionsByCategory} from "@module/interview-template/step-category/repository/mapper/mapQuestionsByCategory";

export class PostgresStepCategoryRepository implements StepCategoryRepository {
    async getStepCategories(stepId: string): Promise<StepCategory[]> {
        const questionInStepCategories = await questionInStepCategoryRepository.find({
            where: {
                stepCategory: {
                    stepId: stepId,
                }
            },
            order: {
                position: "ASC",
                stepCategory: {
                    position: "ASC"
                }
            },
            relations: {
                question: true,
                stepCategory: {
                    questionCategory: true
                }
            }
        });

        return mapQuestionsByCategory(questionInStepCategories)
    }
}