import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import {UpdateQuestion} from "@module/interview-template/question/core/model/UpdateQuestion";

export interface QuestionRepository {
    create(data: CreateQuestion): Promise<Question>
    getByQuestionCategoryId(id: string): Promise<Question[]>
    getQuestionByText(text: string): Promise<Question | null>
    update(data: UpdateQuestion): Promise<UpdateQuestion>
    delete(id: string): Promise<void>
}