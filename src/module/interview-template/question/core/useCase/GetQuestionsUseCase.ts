import {CommandUseCase} from "@lib/model/CommandUseCase";
import {Question} from "@module/interview-template/question/core/model/Question";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";

export class GetQuestionsUseCase implements CommandUseCase<Pick<Question, "id">, Promise<Question[]>> {
    constructor(
        private questionRepository: QuestionRepository
    ) {}

    async execute(data: Pick<Question, "id">): Promise<Question[]> {
        return await this.questionRepository.getQuestions(data);
    }

}