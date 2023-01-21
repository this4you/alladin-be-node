import {CreateInterviewTemplateStep} from "../model/CreateInterviewTemplateStep";
import {InterviewTemplateStep} from "../model/InterviewTemplateStep";

export interface InterviewTemplateStepRepository {
    createInterviewTemplateStep(interviewTemplateStep: CreateInterviewTemplateStep): Promise<InterviewTemplateStep>

    isInterviewTemplateStepByName(createInterviewTemplateStep: CreateInterviewTemplateStep): Promise<boolean>

    getInterviewTemplateStepsByInterviewTemplate(interviewTemplateId: string): Promise<InterviewTemplateStep[]>

    updateInterviewTemplateStep(interviewTemplateStep: InterviewTemplateStep): Promise<InterviewTemplateStep>

    deleteInterviewTemplateStep(id: string): Promise<void>
}