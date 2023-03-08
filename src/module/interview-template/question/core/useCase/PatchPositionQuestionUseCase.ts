import {CommandUseCase} from "@lib/model/CommandUseCase";

import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";

export class PatchPositionQuestionUseCase implements CommandUseCase<PatchPosition, Promise<void>> {

    constructor(
        private repository: QuestionRepository
    ) {}

    async execute(data: PatchPosition): Promise<void> {
        const question = await this.repository.getQuestion(data.id);

        if (question.position > data.position) {
            await this.repository.increasePositionBetween(question.stepCategoryId, question.position, data.position);
        }
        if (question.position < data.position) {
            await this.repository.decreasePositionBetween(question.stepCategoryId, question.position, data.position);
        }

        return await this.repository.patchPosition(data);
    }

}