import {CommandUseCase} from "@lib/model/CommandUseCase";
import {StepRepository} from "@module/interview-template/step/core/port/StepRepository";
import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";

export class PatchPositionStepUseCase implements CommandUseCase<PatchPosition, Promise<void>> {

    constructor(
        private repository: StepRepository
    ) {}
    async execute(data: PatchPosition): Promise<void> {
        const step = await this.repository.getStep(data.id);

        if (step.position > data.position) {
            await this.repository.increasePositionBetween(step.interviewTemplateId, step.position, data.position);
        }
        if (step.position < data.position) {
            await this.repository.decreasePositionBetween(step.interviewTemplateId, step.position, data.position);
        }

        return await this.repository.patchPosition(data);
    }

}