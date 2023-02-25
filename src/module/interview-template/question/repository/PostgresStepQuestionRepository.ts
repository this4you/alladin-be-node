import stepQuestionRepository from '@db/postgre/repositories/stepQuestionRepository';
import { StepQuestionEntity } from '@db/postgre/entities/StepQuestionEntity';

import { StepQuestionRepository } from '@module/interview-template/question/core/port/StepQuestionRepository';
import { QuestionsInStep } from '@module/interview-template/question/core/model/QuestionsInStep';

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
            where: { stepId: stepId },
            relations: {
                question: {
                    questionCategory: true
                }
            }
        });
        return this.mapQuestionsByCategory(questionInStep)
    }

    private mapQuestionsByCategory(stepQuestions: StepQuestionEntity[]): QuestionsInStep[] {
        return stepQuestions.reduce<QuestionsInStep[]>((previousValue: QuestionsInStep[], item: StepQuestionEntity) => {
            const categoryItem = previousValue.find(it => it.categoryId === item.question.questionCategoryId);

            if (categoryItem) {
                categoryItem.questions.push({
                    id: item.questionId,
                    text: item.question.text
                })
            } else {
                previousValue.push({
                    stepId: item.stepId,
                    categoryId: item.question.questionCategoryId,
                    categoryName: item.question.questionCategory.name,
                    questions: [{
                        id: item.questionId,
                        text: item.question.text
                    }]
                })
            }

            return previousValue;

        }, []);
    }
}