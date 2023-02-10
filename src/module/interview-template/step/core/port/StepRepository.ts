import {CreateStep} from "../model/CreateStep";
import {Step} from "../model/Step";
import {UpdateStep} from "../model/UpdateStep";

export interface StepRepository {
    create(data: CreateStep): Promise<Step>

    isExists(name: string, interviewTemplateId: string): Promise<boolean>

    getByInterviewTemplate(id: string): Promise<Step[]>

    update(data: UpdateStep): Promise<UpdateStep>

    delete(id: string): Promise<void>
}