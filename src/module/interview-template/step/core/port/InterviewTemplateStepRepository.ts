import {CreateInterviewTemplateStep} from "../model/CreateInterviewTemplateStep";
import {InterviewTemplateStep} from "../model/InterviewTemplateStep";

export interface InterviewTemplateStepRepository {
    create(data: CreateInterviewTemplateStep): Promise<InterviewTemplateStep>

    isExists(name: string, interviewTemplateId: string): Promise<boolean>

    getByInterviewTemplate(id: string): Promise<InterviewTemplateStep[]>

    update(data: InterviewTemplateStep): Promise<InterviewTemplateStep>

    delete(id: string): Promise<void>
}