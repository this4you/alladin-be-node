import {CreateInterviewTemplate} from "../model/CreateInterviewTemplate";
import {InterviewTemplate} from "../model/InterviewTemplate";
import {InterviewTemplateEntity} from "../../../../db/postgre/entities/InterviewTemplateEntity";
import {DeleteResult} from "typeorm";

export interface InterviewTemplateRepository {
    createInterviewTemplate(interviewTemplate: CreateInterviewTemplate): Promise<InterviewTemplate>

    isInterviewTemplate(id: string): Promise<boolean>

    isInterviewTemplateByName(name: string): Promise<boolean>

    getInterviewTemplate(id: string): Promise<InterviewTemplateEntity>

    getInterviewTemplatesByCompany(companyId: string): Promise<InterviewTemplateEntity[]>

    updateInterviewTemplate(interviewTemplate: InterviewTemplate): Promise<InterviewTemplate>

    deleteInterviewTemplate(id: string): Promise<DeleteResult>
}