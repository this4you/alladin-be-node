import {CreateInterviewTemplateStep} from "../model/CreateInterviewTemplateStep";
import {InterviewTemplateStep} from "../model/InterviewTemplateStep";
import {UpdateInterviewTemplateStep} from "../model/UpdateInterviewTemplateStep";

export interface InterviewTemplateStepRepository {
    create(data: CreateInterviewTemplateStep): Promise<InterviewTemplateStep>

    isExists(name: string, interviewTemplateId: string): Promise<boolean>

    getByInterviewTemplate(id: string): Promise<InterviewTemplateStep[]>

    update(data: UpdateInterviewTemplateStep): Promise<UpdateInterviewTemplateStep>

    delete(id: string): Promise<void>
}