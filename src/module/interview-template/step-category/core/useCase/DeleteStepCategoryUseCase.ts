import {CommandUseCase} from "@lib/model/CommandUseCase";
import {StepCategoryRepository} from "@module/interview-template/step-category/core/port/StepCategoryRepository";

export class DeleteStepCategoryUseCase implements CommandUseCase<string, Promise<void>> {
    constructor(
        private repository: StepCategoryRepository
    ) {}

    async execute(id: string): Promise<void> {
        const stepCategory = await this.repository.getStepCategory(id);
        await this.repository.reducePositionsAfter(stepCategory.stepId, stepCategory.position);
        await this.repository.delete(id);
    }
}