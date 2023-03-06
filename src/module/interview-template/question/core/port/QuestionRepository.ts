import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import {UpdateQuestion} from "@module/interview-template/question/core/model/UpdateQuestion";
import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";

export interface QuestionRepository {
    create(data: CreateQuestion): Promise<Question>
    isExists(data: CreateQuestion): Promise<boolean>
    update(data: UpdateQuestion): Promise<UpdateQuestion>
    getQuestion(id: string): Promise<Question>
    patchPosition(patchData: PatchPosition, questionData: Question): Promise<void>
    delete(data: Question): Promise<void>
}