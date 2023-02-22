import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import {UpdateQuestion} from "@module/interview-template/question/core/model/UpdateQuestion";

export interface QuestionRepository {
    create(data: CreateQuestion): Promise<Question>

    isExists(text: string, questionCategoryId: string): Promise<boolean>

    getByQuestionCategoryId(id: string): Promise<Question[]>

    update(data: UpdateQuestion): Promise<UpdateQuestion>

    delete(id: string): Promise<void>
}