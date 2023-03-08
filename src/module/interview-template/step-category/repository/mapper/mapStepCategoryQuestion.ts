import {StepCategoryEntity} from "@db/postgre/entities/StepCategory";
import {StepCategoryQuestion} from "@module/interview-template/step-category/core/model/StepCategoryQuestion";
import {QuestionEntity} from "@db/postgre/entities/QuestionEntity";

export function mapStepCategoryQuestion(stepCategories: StepCategoryEntity[], questions: QuestionEntity[]): StepCategoryQuestion[] {

    return stepCategories.reduce<StepCategoryQuestion[]>((accum: StepCategoryQuestion[], item: StepCategoryEntity) => {
        let categoryItem = accum.find(it => it.stepCategoryId === item.id);

        if (!categoryItem) {
            categoryItem = {
                stepCategoryId: item.id,
                categoryName: item.questionCategory.name,
                position: item.position,
                questions: []
            };
            accum.push(categoryItem);
        }


        questions.forEach(q => {
            if (categoryItem?.stepCategoryId == q.stepCategoryId) {
                categoryItem.questions.push({
                    id: q.id,
                    text: q.text,
                    position: q.position
                });
            }
        });

        return accum;

    }, []);
}