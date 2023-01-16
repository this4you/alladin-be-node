import {CreateInterviewTemplate} from "../model/CreateInterviewTemplate";
import {InterviewTemplate} from "../model/InterviewTemplate";
import {InterviewTemplateEntity} from "../../../../db/postgre/entities/InterviewTemplateEntity";

export interface InterviewTemplateRepository {
    createInterviewTemplate(interview: CreateInterviewTemplate): Promise<InterviewTemplate>

    isInterviewTemplate(interviewTemplateName: string): Promise<boolean>

    getInterviewTemplatesByCompany(id: string): Promise<InterviewTemplateEntity[]>
}