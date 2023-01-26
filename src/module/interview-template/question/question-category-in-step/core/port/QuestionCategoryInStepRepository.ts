import {QuestionCategoryInStep} from "../model/QuestionCategoryInStep";
import {CreateQuestionCategoryInStep} from "../model/CreateQuestionCategoryInStep";

export interface QuestionCategoryInStepRepository {
    create(data: CreateQuestionCategoryInStep): Promise<QuestionCategoryInStep>

    isExists(questionCategoryId: string, interviewTemplateStepId: string): Promise<boolean>

    get(interviewTemplateStepId: string): Promise<QuestionCategoryInStep[]>

    delete(id: string): Promise<void>
}