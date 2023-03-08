import {CreateStep} from "src/module/interview-template/step/core/model/CreateStep";
import {Step} from "src/module/interview-template/step/core/model/Step";
import {UpdateStep} from "src/module/interview-template/step/core/model/UpdateStep";
import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";

export interface StepRepository {
    create(data: CreateStep): Promise<Step>
    isExists(name: string, interviewTemplateId: string): Promise<boolean>
    update(data: UpdateStep): Promise<UpdateStep>
    getByInterviewTemplate(id: string): Promise<Step[]>
    getStep(id: string): Promise<Step>
    reducePositionsAfter(interviewTemplateId: string, position: number): Promise<void>
    delete(id: string): Promise<void>
    patchPosition(patchData: PatchPosition): Promise<void>
    increasePositionBetween(interviewTemplateId: string, currentPosition: number, newPosition: number): Promise<void>
    decreasePositionBetween(interviewTemplateId: string, currentPosition: number, newPosition: number): Promise<void>
}