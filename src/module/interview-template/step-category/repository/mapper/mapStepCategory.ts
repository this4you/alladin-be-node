import {StepCategoryEntity} from "@db/postgre/entities/StepCategory";
import {StepCategoryQuestion} from "@module/interview-template/step-category/core/model/StepCategoryQuestion";

export function mapStepCategory(stepCategory: StepCategoryEntity[]): StepCategoryQuestion[] {
    return stepCategory.reduce<StepCategoryQuestion[]>((accum: StepCategoryQuestion[], item: StepCategoryEntity) => {
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

        return accum;

    }, []);
}