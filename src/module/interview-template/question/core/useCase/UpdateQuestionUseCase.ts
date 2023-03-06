import {UniqueException} from "@lib/model/app-exception/UniqueException";
import {Validator} from "@lib/model/Validator";
import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";

import {Question} from "@module/interview-template/question/core/model/Question";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";

export class UpdateStepUseCase extends ValidateCommandUseCase<Question, Promise<Question>> {
    constructor(
        private repository: QuestionRepository,
        private validateUtils: Validator<Question>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: Question): Promise<Question> {
        const isQuestion = await this.repository.isExists(data);

        if (isQuestion) {
            throw new UniqueException(`Interview name ${data} already existed`);
        }

        return await this.repository.update(data);
    }

}