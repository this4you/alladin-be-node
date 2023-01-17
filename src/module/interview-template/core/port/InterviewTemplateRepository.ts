import {CreateInterviewTemplate} from "../model/CreateInterviewTemplate";
import {InterviewTemplate} from "../model/InterviewTemplate";

export interface InterviewTemplateRepository {
    createInterviewTemplate(interviewTemplate: CreateInterviewTemplate): Promise<InterviewTemplate>

    isInterviewTemplateByName(name: string): Promise<boolean>

    getInterviewTemplate(id: string): Promise<InterviewTemplate>

    getInterviewTemplatesByCompany(companyId: string): Promise<InterviewTemplate[]>

    updateInterviewTemplate(interviewTemplate: InterviewTemplate): Promise<void>

    deleteInterviewTemplate(id: string): Promise<void>
}