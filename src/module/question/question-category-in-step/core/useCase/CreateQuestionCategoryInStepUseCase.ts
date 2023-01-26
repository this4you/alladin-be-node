import {ValidateCommandUseCase} from "../../../../../lib/model/ValidateCommandUseCase";
import {Validator} from "../../../../../lib/model/Validator";
import {UniqueException} from "../../../../../lib/model/app-exception/UniqueException";
import {QuestionCategoryInStep} from "../model/QuestionCategoryInStep";
import {CreateQuestionCategoryInStep} from "../model/CreateQuestionCategoryInStep";
import {QuestionCategoryInStepRepository} from "../port/QuestionCategoryInStepRepository";

export class CreateQuestionCategoryInStepUseCase extends ValidateCommandUseCase<CreateQuestionCategoryInStep, Promise<QuestionCategoryInStep>> {
    constructor(
        private repository: QuestionCategoryInStepRepository,
        private validateUtils: Validator<CreateQuestionCategoryInStep>
    ) {
        super(validateUtils);
    }

    protected async validatedExecute(data: CreateQuestionCategoryInStep): Promise<QuestionCategoryInStep> {
        const questionCategoryInStep = await this.repository.isExists(data.questionCategoryId, data.interviewTemplateStepId);

        if (questionCategoryInStep) {
            throw new UniqueException(`QuestionCategoryInStep name ${data.questionCategoryId} already existed`)
        }

        return await this.repository.create(data);
    }
}