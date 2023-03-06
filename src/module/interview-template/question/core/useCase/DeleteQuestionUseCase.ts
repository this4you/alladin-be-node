import {CommandUseCase} from "@lib/model/CommandUseCase";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";

export class DeleteQuestionUseCase implements CommandUseCase<string, Promise<void>> {
    constructor(
        private repository: QuestionRepository
    ) {}

    async execute(id: string): Promise<void> {
        const question = await this.repository.getQuestion(id);

        await this.repository.delete(question);
    }
}