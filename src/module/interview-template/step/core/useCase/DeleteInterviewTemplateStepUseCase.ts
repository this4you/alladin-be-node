import {CommandUseCase} from "../../../../../lib/model/CommandUseCase";
import {InterviewTemplateStepRepository} from "../port/InterviewTemplateStepRepository";

export class DeleteInterviewTemplateStepUseCase implements CommandUseCase<string, Promise<void>> {
    constructor(
        private repository: InterviewTemplateStepRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}