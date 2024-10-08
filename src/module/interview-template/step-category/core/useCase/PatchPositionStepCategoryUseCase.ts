import {CommandUseCase} from "@lib/model/CommandUseCase";
import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";
import {StepCategoryRepository} from "@module/interview-template/step-category/core/port/StepCategoryRepository";

export class PatchPositionStepCategoryUseCase implements CommandUseCase<PatchPosition, Promise<void>> {

    constructor(
        private repository: StepCategoryRepository
    ) {}
    async execute(data: PatchPosition): Promise<void> {
        const stepCategory = await this.repository.getStepCategory(data.id);

        if (stepCategory.position > data.position) {
            await this.repository.increasePositionBetween(stepCategory.stepId, stepCategory.position, data.position);
        }
        if (stepCategory.position < data.position) {
            await this.repository.decreasePositionBetween(stepCategory.stepId, stepCategory.position, data.position);
        }

        return await this.repository.patchPosition(data);
    }

}