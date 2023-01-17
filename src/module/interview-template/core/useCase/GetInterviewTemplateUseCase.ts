import {CommandUseCase} from "../../../../lib/model/CommandUseCase";
import {NotFoundException} from "../../../../lib/model/app-exception/NotFoundException";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";
import {InterviewTemplate} from "../model/InterviewTemplate";

export class GetInterviewTemplateUseCase implements CommandUseCase<string, Promise<InterviewTemplate>> {
    constructor(
        private  interviewTemplateRepository: InterviewTemplateRepository
    ) {}

    async execute(id: string): Promise<InterviewTemplate> {
        const interviewTemplate = await this.interviewTemplateRepository.getInterviewTemplate(id);

        if (interviewTemplate == null) {
            throw new NotFoundException(`InterviewTemplate with id: ${id} was not found!`)
        }

        return interviewTemplate;
    }
}