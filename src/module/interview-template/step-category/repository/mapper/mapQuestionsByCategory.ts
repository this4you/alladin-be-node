import {QuestionInStepCategoryEntity} from "@db/postgre/entities/QuestionInStepCategory";
import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";

export function mapQuestionsByCategory(stepQuestions: QuestionInStepCategoryEntity[]): StepCategory[] {
    return stepQuestions.reduce<StepCategory[]>((accum: StepCategory[], item: QuestionInStepCategoryEntity) => {
        let categoryItem = accum.find(it => it.stepCategoryId === item.stepCategoryId);

        if (!categoryItem) {
            categoryItem = {
                stepCategoryId: item.stepCategoryId,
                categoryName: item.stepCategory.questionCategory.name,
                position: item.stepCategory.position,
                questions: []
            };
            accum.push(categoryItem);
        }

        categoryItem.questions.push({
            id: item.questionId,
            text: item.question.text,
            position: item.position
        });

        return accum;

    }, []);
}