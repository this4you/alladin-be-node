import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";
import {UpdateQuestion} from "@module/interview-template/question/core/model/UpdateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";
import {Validator} from "@lib/model/Validator";

export class UpdateQuestionUseCase extends ValidateCommandUseCase<UpdateQuestion, Promise<Question>> {
    constructor(
        private repository: QuestionRepository,
        private validateUtils: Validator<UpdateQuestion>
    ) {
        super(validateUtils);
    }
    protected async validatedExecute(data: UpdateQuestion): Promise<Question> {
        return await this.repository.update(data);
    }

}