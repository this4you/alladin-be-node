import {CommandUseCase} from "../../../../lib/model/CommandUseCase";
import {NotFoundException} from "../../../../lib/model/app-exception/NotFoundException";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";

export class DeleteInterviewTemplateUseCase implements CommandUseCase<string, Promise<void>> {
    constructor(
        private  interviewTemplateRepository: InterviewTemplateRepository
    ) {}

    async execute(id: string): Promise<void> {
        const interviewTemplate = await this.interviewTemplateRepository.deleteInterviewTemplate(id);

        if (interviewTemplate == null) {
            throw new NotFoundException(`InterviewTemplate with id: ${id} was not found!`)
        }

    }
}