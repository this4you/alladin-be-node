import {NotFoundException} from "@lib/model/app-exception/NotFoundException";
import interviewTemplateStepRepository from "@db/postgre/repositories/interviewTemplateStepRepository";
import questionCategoryRepository from "@db/postgre/repositories/questionCategoryRepository";
import questionCategoryInStepRepository from "@db/postgre/repositories/questionCategoryInStepRepository";

import {QuestionCategoryInStep} from "../core/model/QuestionCategoryInStep";
import {QuestionCategoryInStepRepository} from "../core/port/QuestionCategoryInStepRepository";
import {CreateQuestionCategoryInStep} from "../core/model/CreateQuestionCategoryInStep";

export class PostgresQuestionCategoryInStepRepository implements QuestionCategoryInStepRepository {
    async create(data: CreateQuestionCategoryInStep): Promise<QuestionCategoryInStep> {
        const interviewTemplateStep = await interviewTemplateStepRepository.findOneBy({id: data.interviewTemplateStepId });

        if (interviewTemplateStep == null) {
            throw new NotFoundException("InterviewTemplate is not found!")
        }

        const questionCategory = await questionCategoryRepository.findOneBy({id: data.questionCategoryId});

        if (questionCategory == null) {
            throw new NotFoundException("QuestionCategories is not found!")
        }

        const questionCategoryInStep = questionCategoryInStepRepository.create({
            questionCategory: questionCategory,
            interviewTemplateStep: interviewTemplateStep
        });

        await questionCategoryInStepRepository.save(questionCategoryInStep);
        console.log('INTERVIEW-TEMPLATE WAS CREATED', questionCategoryInStep);

        return {id: questionCategoryInStep.id}
    }

    async delete(id: string): Promise<void> {
        await questionCategoryInStepRepository.delete(id);
    }

    async get(interviewTemplateStepId: string): Promise<QuestionCategoryInStep[]> {
        return await questionCategoryInStepRepository.findBy({
            interviewTemplateStep: {id: interviewTemplateStepId},
        });
    }

    async isExists(questionCategoryId: string, interviewTemplateStepId: string): Promise<boolean> {
        return !!await questionCategoryInStepRepository.findOneBy({
            questionCategory: {id: questionCategoryId},
            interviewTemplateStep: {id: interviewTemplateStepId}
        });
    }

}