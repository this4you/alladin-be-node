import {QuestionEntity} from "@db/postgre/entities/QuestionEntity";
import {StepCategoryQuestion} from "@module/interview-template/step-category/core/model/StepCategoryQuestion";

export function mapQuestionsByCategory(stepQuestions: QuestionEntity[]): StepCategoryQuestion[] {
    return stepQuestions.reduce<StepCategoryQuestion[]>((accum: StepCategoryQuestion[], item: QuestionEntity) => {
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
            id: item.id,
            text: item.text,
            position: item.position
        });

        return accum;

    }, []);
}