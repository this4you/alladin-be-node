import {StepCategoryRepository} from "@module/interview-template/step-category/core/port/StepCategoryRepository";
import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";
import {StepFrame} from "@module/interview-template/step-category/core/model/StepFrame";

import questionInStepCategoryRepository from "@db/postgre/repositories/questionInStepCategoryRepository";
import {mapQuestionsByCategory} from "@module/interview-template/step-category/repository/mapQuestionsByCategory";

export class PostgresStepCategoryRepository implements StepCategoryRepository {
    async getFrame(data: Pick<StepCategory, "stepId">): Promise<StepFrame[]> {
        const questionInStepCategories = await questionInStepCategoryRepository.find({
            where: {
                stepCategory: {
                    stepId: data.stepId,
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