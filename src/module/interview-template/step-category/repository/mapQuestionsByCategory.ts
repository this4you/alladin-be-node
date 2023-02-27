import {QuestionInStepCategoryEntity} from "@db/postgre/entities/QuestionInStepCategory";
import {StepFrame} from "@module/interview-template/step-category/core/model/StepFrame";

export function mapQuestionsByCategory(stepQuestions: QuestionInStepCategoryEntity[]): StepFrame[] {
    return stepQuestions.reduce<StepFrame[]>((accum: StepFrame[], item: QuestionInStepCategoryEntity) => {
        let categoryItem = accum.find(it => it.stepCategoryId === item.stepCategory.questionCategoryId);

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