import {CreateInterviewTemplate} from "../model/CreateInterviewTemplate";
import {InterviewTemplate} from "../model/InterviewTemplate";

export interface InterviewTemplateRepository {
    createInterviewTemplate(interviewTemplate: CreateInterviewTemplate): Promise<InterviewTemplate>

    isInterviewTemplateByName(createInterviewTemplate: CreateInterviewTemplate): Promise<boolean>

    getInterviewTemplatesByCompany(companyId: string): Promise<InterviewTemplate[]>

    updateInterviewTemplate(interviewTemplate: InterviewTemplate): Promise<InterviewTemplate>

    deleteInterviewTemplate(id: string): Promise<void>
}