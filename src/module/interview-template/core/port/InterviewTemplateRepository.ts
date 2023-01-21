import {CreateInterviewTemplate} from "../model/CreateInterviewTemplate";
import {InterviewTemplate} from "../model/InterviewTemplate";

export interface InterviewTemplateRepository {
    create(interviewTemplate: CreateInterviewTemplate): Promise<InterviewTemplate>

    isExists(name: string, companyId: string): Promise<boolean>

    get(companyId: string): Promise<InterviewTemplate[]>

    update(interviewTemplate: InterviewTemplate): Promise<InterviewTemplate>

    delete(id: string): Promise<void>
}