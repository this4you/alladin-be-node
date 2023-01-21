import {CreateInterviewTemplateStep} from "../model/CreateInterviewTemplateStep";
import {InterviewTemplateStep} from "../model/InterviewTemplateStep";

export interface InterviewTemplateStepRepository {
    createInterviewTemplateStep(InterviewTemplateStep: CreateInterviewTemplateStep): Promise<InterviewTemplateStep>

    isInterviewTemplateStepByName(name: string): Promise<boolean>

    getInterviewTemplateStepsByInterviewTemplate(interviewTemplateId: string): Promise<InterviewTemplateStep[]>

    updateInterviewTemplateStep(interviewTemplateStep: InterviewTemplateStep): Promise<InterviewTemplateStep>

    deleteInterviewTemplateStep(id: string): Promise<void>
}