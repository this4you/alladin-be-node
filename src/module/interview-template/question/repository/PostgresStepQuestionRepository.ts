import stepQuestionRepository from "@db/postgre/repositories/stepQuestionRepository";
import { StepQuestionEntity } from "@db/postgre/entities/StepQuestionEntity";

import {StepQuestionRepository} from "@module/interview-template/question/core/port/StepQuestionRepository";
import {QuestionsInStep} from "@module/interview-template/question/core/model/QuestionsInStep";
import {Question} from "@module/interview-template/question/core/model/Question";

export class PostgresStepQuestionRepository implements StepQuestionRepository {
    async create(questionId: string, stepId: string): Promise<string> {
        const stepQuestion = stepQuestionRepository.create({
            stepId: stepId,
            questionId: questionId
        });
        await stepQuestionRepository.save(stepQuestion);
        return stepQuestion.id;
    }

    async getByStepId(stepId: string): Promise<QuestionsInStep[]> {
        const questionInStep = await stepQuestionRepository.find({
            where: {stepId: stepId},
            relations: {
                question: {
                    questionCategory: true
                }
            }
        });
        this.mapQuestionsByCategory(questionInStep)
        return []
    }

    private mapQuestionsByCategory(stepQuestions:  StepQuestionEntity[]): QuestionsInStep[] {

        //

         return []
    }
}