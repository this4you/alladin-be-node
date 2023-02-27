import {getStepFrameContext} from "@module/interview-template/step-category/config/factory";
import {Router} from "express";
import {auth} from "@infrastructure/middleware/auth";
import {tryExecute} from "@infrastructure/utils/tryExecute";


const stepCategoryRouter = Router();
const {
    getStepCategoryUseCase
} = getStepFrameContext();


stepCategoryRouter.get('/:stepId', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const stepId = req.params.stepId && req.params.stepId.toString() || '';
        const stepsOfInterviewTemplate = await getStepCategoryUseCase.execute({stepId});
        res.json(stepsOfInterviewTemplate);
    });
});

export default stepCategoryRouter;