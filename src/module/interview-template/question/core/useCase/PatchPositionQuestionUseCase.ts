import {CommandUseCase} from "@lib/model/CommandUseCase";

import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";
import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";

export class PatchPositionQuestionUseCase implements CommandUseCase<PatchPosition, Promise<void>> {

    constructor(
        private repository: QuestionRepository
    ) {}
    async execute(data: PatchPosition): Promise<void> {
        const question = await this.repository.getQuestion(data.id);

        return await this.repository.patchPosition(data, question);
    }

}