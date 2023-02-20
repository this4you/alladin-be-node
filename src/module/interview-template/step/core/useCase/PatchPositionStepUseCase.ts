import {CommandUseCase} from "@lib/model/CommandUseCase";
import {StepRepository} from "src/module/interview-template/step/core/port/StepRepository";
import {PatchPosition} from "src/module/interview-template/step/core/model/PatchPosition";

export class PatchPositionStepUseCase implements CommandUseCase<PatchPosition, Promise<void>> {

    constructor(
        private repository: StepRepository
    ) {}
    async execute(data: PatchPosition): Promise<void> {
        const step = await this.repository.getStep(data.id);

        return await this.repository.pathPosition(data, step);
    }

}