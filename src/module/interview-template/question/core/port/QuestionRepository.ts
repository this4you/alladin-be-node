import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";

export interface QuestionRepository {
    create(data: CreateQuestion): Promise<Question>
    getQuestionByText(text: string): Promise<Question | null>
    getQuestions(id: string): Promise<Question[]>
}