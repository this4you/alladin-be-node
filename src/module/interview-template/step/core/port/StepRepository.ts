import {CreateStep} from "../model/CreateStep";
import {Step} from "../model/Step";
import {UpdateStep} from "../model/UpdateStep";
import {PatchPosition} from "src/module/interview-template/step/core/model/PatchPosition";

export interface StepRepository {
    create(data: CreateStep): Promise<Step>

    isExists(name: string, interviewTemplateId: string): Promise<boolean>

    getByInterviewTemplate(id: string): Promise<Step[]>

    getStep(id: string): Promise<Step>

    update(data: UpdateStep): Promise<UpdateStep>

    delete(data: Step): Promise<void>

    pathPosition(patchData: PatchPosition, stepData: Step): Promise<void>
}