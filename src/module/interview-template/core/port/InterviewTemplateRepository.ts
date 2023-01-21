import {CreateInterviewTemplate} from "../model/CreateInterviewTemplate";
import {InterviewTemplate} from "../model/InterviewTemplate";

export interface InterviewTemplateRepository {
    createInterviewTemplate(interviewTemplate: CreateInterviewTemplate): Promise<InterviewTemplate>

    isInterviewTemplateByName(name: string): Promise<boolean>

    getInterviewTemplatesByCompany(companyId: string): Promise<InterviewTemplate[]>

    updateInterviewTemplate(interviewTemplate: InterviewTemplate): Promise<InterviewTemplate>

    deleteInterviewTemplate(id: string): Promise<void>
}