import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";
import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";
import {Validator} from "@lib/model/Validator";
import {UniqueException} from "@lib/model/app-exception/UniqueException";

export class CreateQuestionUseCase extends ValidateCommandUseCase<CreateQuestion, Promise<Question>> {
    constructor(
        private repository: QuestionRepository,
        private validateUtils: Validator<CreateQuestion>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: CreateQuestion): Promise<Question> {
        const isQuestion = await this.repository.isExists(data.text, data.questionCategoryId);

        if (isQuestion) {
            throw new UniqueException(`Question text ${data.text} in questionCategoryId ${data.questionCategoryId} already existed`)
        }

        return await this.repository.create(data);
    }

}