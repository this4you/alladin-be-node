import {CreateInterviewTemplateStep} from "../model/CreateInterviewTemplateStep";
import {InterviewTemplateStep} from "../model/InterviewTemplateStep";

export interface InterviewTemplateStepRepository {
    create(interviewTemplateStep: CreateInterviewTemplateStep): Promise<InterviewTemplateStep>

    isExists(name: string, interviewTemplateId: string): Promise<boolean>

    get(interviewTemplateId: string): Promise<InterviewTemplateStep[]>

    update(interviewTemplateStep: InterviewTemplateStep): Promise<InterviewTemplateStep>

    delete(id: string): Promise<void>
}