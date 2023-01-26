import {CreateInterviewTemplate} from "../model/CreateInterviewTemplate";
import {InterviewTemplate} from "../model/InterviewTemplate";

export interface InterviewTemplateRepository {
    create(data: CreateInterviewTemplate): Promise<InterviewTemplate>

    isExists(name: string, companyId: string): Promise<boolean>

    getByCompany(id: string): Promise<InterviewTemplate[]>

    update(data: InterviewTemplate): Promise<InterviewTemplate>

    delete(id: string): Promise<void>
}