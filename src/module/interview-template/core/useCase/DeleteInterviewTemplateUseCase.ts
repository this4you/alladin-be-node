import {CommandUseCase} from "../../../../lib/model/CommandUseCase";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";

export class DeleteInterviewTemplateUseCase implements CommandUseCase<string, Promise<void>> {
    constructor(
        private  interviewTemplateRepository: InterviewTemplateRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.interviewTemplateRepository.deleteInterviewTemplate(id);
    }
}