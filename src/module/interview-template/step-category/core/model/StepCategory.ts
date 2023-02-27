import { QuestionCategory } from "@module/interview-template/question-category/core/model/QuestionCategory";
import {Step} from "@module/interview-template/step/core/model/Step";

export type StepCategory = {
    stepId: string;
    step: Step;
    questionCategoryId: string;
    questionCategory: QuestionCategory;
    position: number;
}