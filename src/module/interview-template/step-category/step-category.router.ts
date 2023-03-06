import {getStepCategoryContext} from "@module/interview-template/step-category/config/factory";
import {Router} from "express";
import {auth} from "@infrastructure/middleware/auth";
import {tryExecute} from "@infrastructure/utils/tryExecute";


const stepCategoryRouter = Router();
const {
    createStepCategoryUseCase,
    getStepCategoryUseCase,
    deleteStepCategoryUseCase,
    patchPositionStepCategoryUseCase
} = getStepCategoryContext();

stepCategoryRouter.post('/', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const stepsOfInterviewTemplate = await createStepCategoryUseCase.execute({
            stepId: req.body.stepId,
            questionCategoryId: req.body.questionCategoryId
        });
        res.json(stepsOfInterviewTemplate);
    });
});

stepCategoryRouter.get('/:stepId', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const stepId = req.params.stepId && req.params.stepId.toString() || '';
        const stepsOfInterviewTemplate = await getStepCategoryUseCase.execute(stepId);
        res.json(stepsOfInterviewTemplate);
    });
});

stepCategoryRouter.delete('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const stepCategory = await deleteStepCategoryUseCase.execute(req.params.id);
        res.json(stepCategory);
    });
});

stepCategoryRouter.patch('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const stepCategory = await patchPositionStepCategoryUseCase.execute({
            id: req.params.id,
            position: req.body.position
        });
        res.json(stepCategory);
    });
});

export default stepCategoryRouter;