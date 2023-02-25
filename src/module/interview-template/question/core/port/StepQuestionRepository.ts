import {QuestionsInStep} from "@module/interview-template/question/core/model/QuestionsInStep";

export interface StepQuestionRepository {
    create(questionId: string, stepId: string): Promise<string>
    getByStepId(stepId: string): Promise<QuestionsInStep[]>
}