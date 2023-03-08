import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import {UpdateQuestion} from "@module/interview-template/question/core/model/UpdateQuestion";
import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";

export interface QuestionRepository {
    create(data: CreateQuestion): Promise<Question>
    isExists(text: string, stepCategoryId: string): Promise<boolean>
    update(data: UpdateQuestion): Promise<UpdateQuestion>
    getQuestion(id: string): Promise<Question>
    reducePositionsAfter(stepCategoryId: string, position: number): Promise<void>
    delete(id: string): Promise<void>
    patchPosition(patchData: PatchPosition): Promise<void>
    increasePositionBetween(stepCategoryId: string, currentPosition: number, newPosition: number): Promise<void>
    decreasePositionBetween(stepCategoryId: string, currentPosition: number, newPosition: number): Promise<void>
}