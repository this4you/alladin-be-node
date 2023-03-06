
import {StepCategoryRepository} from "@module/interview-template/step-category/core/port/StepCategoryRepository";
import {mapQuestionsByCategory} from "@module/interview-template/step-category/repository/mapper/mapQuestionsByCategory";
import questionRepository from "@db/postgre/repositories/questionRepository";
import {CreateStepCategory} from "@module/interview-template/step-category/core/model/CreateStepCategory";
import stepCategoryRepository from "@db/postgre/repositories/stepCategoryRepository";
import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";
import {StepCategoryQuestion} from "@module/interview-template/step-category/core/model/StepCategoryQuestion";

export class PostgresStepCategoryRepository implements StepCategoryRepository {
    async getByStep(stepId: string): Promise<StepCategoryQuestion[]> {
        const questionInStepCategories = await questionRepository.find({
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
                stepCategory: {
                    questionCategory: true
                }
            }
        });

        return mapQuestionsByCategory(questionInStepCategories)
    }

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
}