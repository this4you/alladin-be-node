import {QuestionCategoryInStep} from "src/module/interview-template/question-category-in-step/core/model/QuestionCategoryInStep";
import {CreateQuestionCategoryInStep} from "src/module/interview-template/question-category-in-step/core/model/CreateQuestionCategoryInStep";

export interface QuestionCategoryInStepRepository {
    create(data: CreateQuestionCategoryInStep): Promise<QuestionCategoryInStep>

    isExists(questionCategoryId: string, interviewTemplateStepId: string): Promise<boolean>

    get(interviewTemplateStepId: string): Promise<QuestionCategoryInStep[]>

    delete(id: string): Promise<void>
}