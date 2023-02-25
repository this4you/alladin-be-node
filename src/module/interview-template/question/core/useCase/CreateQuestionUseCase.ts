import {Validator} from "@lib/model/Validator";
import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";
import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";
import {StepQuestionRepository} from "@module/interview-template/question/core/port/StepQuestionRepository";

export class CreateQuestionUseCase extends ValidateCommandUseCase<CreateQuestion, Promise<Question>> {
    constructor(
        private questionRepository: QuestionRepository,
        private stepQuestionRepository: StepQuestionRepository,
        private validateUtils: Validator<CreateQuestion>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: CreateQuestion): Promise<Question> {
        let question = await this.questionRepository.getQuestionByText(data.text);

        if (!question) {
            question = await this.questionRepository.create(data);
        }

        await this.stepQuestionRepository.create(question.id, data.stepId);

        return question;
    }
}