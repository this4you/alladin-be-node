import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";
import { Question } from "../model/Question";
import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {Validator} from "@lib/model/Validator";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";

export class CreateQuestionUseCase extends ValidateCommandUseCase<CreateQuestion, Promise<Question>> {
    constructor(
        private questionRepository: QuestionRepository,
        private validateUtils: Validator<CreateQuestion>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: CreateQuestion): Promise<Question> {
        let question = await this.questionRepository.getQuestionByText(data.text);

        if (!question) {
            question = await this.questionRepository.create(data);
        }

        return question;
    }
}