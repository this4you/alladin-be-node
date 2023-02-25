import {CommandUseCase} from "@lib/model/CommandUseCase";
import {StepQuestionRepository} from "@module/interview-template/question/core/port/StepQuestionRepository";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";
import {QuestionsInStep} from "@module/interview-template/question/core/model/QuestionsInStep";

export class GetStepQuestionUseCase implements CommandUseCase<string, Promise<QuestionsInStep[]>> {
    constructor(
        private questionRepository: QuestionRepository,
        private stepQuestionRepository: StepQuestionRepository,
    ){};

    async execute(stepId: string): Promise<QuestionsInStep[]> {
        return await this.stepQuestionRepository.getByStepId(stepId);
    }

}