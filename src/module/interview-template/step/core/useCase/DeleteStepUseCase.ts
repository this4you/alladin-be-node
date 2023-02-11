import {CommandUseCase} from "@lib/model/CommandUseCase";

import {StepRepository} from "../port/StepRepository";

export class DeleteStepUseCase implements CommandUseCase<string, Promise<void>> {
    constructor(
        private repository: StepRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}