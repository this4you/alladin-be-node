import {UniqueException} from "@lib/model/app-exception/UniqueException";
import {Validator} from "@lib/model/Validator";
import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";

import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";
import {UpdateQuestion} from "@module/interview-template/question/core/model/UpdateQuestion";

export class UpdateQuestionUseCase extends ValidateCommandUseCase<UpdateQuestion, Promise<UpdateQuestion>> {
    constructor(
        private repository: QuestionRepository,
        private validateUtils: Validator<UpdateQuestion>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: UpdateQuestion): Promise<UpdateQuestion> {
        const isQuestion = await this.repository.isExists(data);

        if (isQuestion) {
            throw new UniqueException(`Interview name ${data} already existed`);
        }

        return await this.repository.update(data);
    }

}