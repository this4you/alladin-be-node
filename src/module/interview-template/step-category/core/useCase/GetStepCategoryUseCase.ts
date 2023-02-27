import {CommandUseCase} from "@lib/model/CommandUseCase";
import {StepFrame} from "@module/interview-template/step-category/core/model/StepFrame";
import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";
import {StepCategoryRepository} from "@module/interview-template/step-category/core/port/StepCategoryRepository";

export class GetStepCategoryUseCase implements CommandUseCase<Pick<StepCategory, "stepId">, Promise<StepFrame[]>> {
    constructor(
        private stepFrameRepository: StepCategoryRepository,

    ){};

    async execute(data: Pick<StepCategory, "stepId">): Promise<StepFrame[]> {
        return await this.stepFrameRepository.getFrame(data);
    }

}