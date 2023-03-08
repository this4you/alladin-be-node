import {UniqueException} from "@lib/model/app-exception/UniqueException";
import {Validator} from "@lib/model/Validator";
import {ValidateCommandUseCase} from "@lib/model/ValidateCommandUseCase";

import {Question} from "@module/interview-template/question/core/model/Question";
import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";

export class CreateQuestionUseCase extends ValidateCommandUseCase<CreateQuestion, Promise<Question>> {
    constructor(
        private repository: QuestionRepository,
        private validateUtils: Validator<CreateQuestion>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: CreateQuestion): Promise<Question> {
        const isQuestion = await this.repository.isExists(data.text, data.stepCategoryId);

        if (isQuestion) {
            throw new UniqueException(`Question text: '${data.text}' in StepCategory: '${data.stepCategoryId}' already existed`);
        }

        return await this.repository.create(data);
    }
}