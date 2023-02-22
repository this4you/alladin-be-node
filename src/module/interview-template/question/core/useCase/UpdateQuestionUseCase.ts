import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";
import {UpdateQuestion} from "@module/interview-template/question/core/model/UpdateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";
import {Validator} from "@lib/model/Validator";
import {UniqueException} from "@lib/model/app-exception/UniqueException";

export class UpdateQuestionUseCase extends ValidateCommandUseCase<UpdateQuestion, Promise<Question>> {
    constructor(
        private repository: QuestionRepository,
        private validateUtils: Validator<UpdateQuestion>
    ) {
        super(validateUtils);
    }
    protected async validatedExecute(data: UpdateQuestion): Promise<Question> {
        const isQuestion = await this.repository.isExists(data.text, data.questionCategoryId);

        if (isQuestion) {
            throw new UniqueException(`Question text ${data.text} in questionCategoryId ${data.questionCategoryId} already existed`)
        }

        return await this.repository.update(data);
    }

}