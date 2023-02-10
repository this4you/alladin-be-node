import {CreateInterviewTemplate} from "../model/CreateInterviewTemplate";
import {InterviewTemplate} from "../model/InterviewTemplate";
import {UpdateInterviewTemplate} from "../model/UpdateInterviewTemplate";

export interface InterviewTemplateRepository {
    create(data: CreateInterviewTemplate): Promise<InterviewTemplate>

    isExists(name: string, companyId: string): Promise<boolean>

    getByCompany(id: string): Promise<InterviewTemplate[]>

    update(data: UpdateInterviewTemplate): Promise<UpdateInterviewTemplate>

    delete(id: string): Promise<void>
}