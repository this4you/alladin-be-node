import {CommandUseCase} from "../../../../lib/model/CommandUseCase";
import {InterviewTemplateRepository} from "../port/InterviewTemplateRepository";
import {UniqueException} from "../../../../lib/model/app-exception/UniqueException";
import {InterviewTemplate} from "../model/InterviewTemplate";

export class UpdateInterviewTemplateUseCase implements CommandUseCase<InterviewTemplate, Promise<InterviewTemplate>> {

    constructor(
        private  interviewTemplateRepository: InterviewTemplateRepository
    ) {}

    async execute(data: InterviewTemplate): Promise<InterviewTemplate> {

        const isInterviewTemplate = await this.interviewTemplateRepository.isInterviewTemplate(data.id);

        if (isInterviewTemplate) {
            throw new UniqueException(`InterviewTemplate '${data.id})' does not exist`)
        }

        return await this.interviewTemplateRepository.updateInterviewTemplate(data);
    }
}