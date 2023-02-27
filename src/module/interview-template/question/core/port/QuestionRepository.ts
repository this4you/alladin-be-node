import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";

export interface QuestionRepository {
    create(data: CreateQuestion): Promise<Question>
    getQuestionByText(data: Pick<Question, "text">): Promise<Question | null>
    getQuestions(data: Pick<Question, "id">): Promise<Question[]>
}