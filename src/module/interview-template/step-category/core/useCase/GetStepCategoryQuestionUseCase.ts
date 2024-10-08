import {CommandUseCase} from "@lib/model/CommandUseCase";
import {StepCategoryRepository} from "@module/interview-template/step-category/core/port/StepCategoryRepository";
import {StepCategoryQuestion} from "@module/interview-template/step-category/core/model/StepCategoryQuestion";

export class GetStepCategoryQuestionUseCase implements CommandUseCase<string, Promise<StepCategoryQuestion[]>> {
    constructor(
        private repository: StepCategoryRepository,
    ) {}

    async execute(stepId: string): Promise<StepCategoryQuestion[]> {
        return await this.repository.getCategoryQuestionByStep(stepId);
    }

}