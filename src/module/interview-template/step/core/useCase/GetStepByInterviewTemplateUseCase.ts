import {CommandUseCase} from "@lib/model/CommandUseCase";

import {StepRepository} from "../port/StepRepository";
import {Step} from "../model/Step";

export class GetStepByInterviewTemplateUseCase implements CommandUseCase<string, Promise<Step[]>> {
    constructor(
        private  repository: StepRepository
    ) {}

    async execute(interviewTemplateId: string): Promise<Step[]> {
        return await this.repository.getByInterviewTemplate(interviewTemplateId);
    }
}