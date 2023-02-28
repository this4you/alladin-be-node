import {CommandUseCase} from "@lib/model/CommandUseCase";
import {StepCategory} from "@module/interview-template/step-category/core/model/StepCategory";
import {StepCategoryRepository} from "@module/interview-template/step-category/core/port/StepCategoryRepository";

export class GetStepCategoryUseCase implements CommandUseCase<string, Promise<StepCategory[]>> {
    constructor(
        private stepFrameRepository: StepCategoryRepository,

    ){};

    async execute(stepId: string): Promise<StepCategory[]> {
        return await this.stepFrameRepository.getStepCategories(stepId);
    }

}