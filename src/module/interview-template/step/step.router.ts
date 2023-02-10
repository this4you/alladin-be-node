import {Request, Router} from "express";

import {auth} from "@infrastructure/middleware/auth";
import {tryExecute} from "@infrastructure/utils/tryExecute";

import {getInterviewTemplateStepContext} from "./config/factory";
import {Step} from "./core/model/Step";
import {CreateStep} from "./core/model/CreateStep";

const stepRouter = Router();
const {
    createInterviewTemplateStepUseCase,
    getInterviewTemplateStepByInterviewTemplateUseCase,
    updateInterviewTemplateStepUseCase,
    deleteInterviewTemplateStepUseCase,
} = getInterviewTemplateStepContext();

stepRouter.post('/', auth, async (req: Request<{}, Step, CreateStep>, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplateStep = await createInterviewTemplateStepUseCase.execute({
            name: req.body.name,
            interviewTemplateId: req.body.interviewTemplateId,
        });
        res.json(interviewTemplateStep);
    });
});

stepRouter.get('/', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplate = req.query.interviewTemplate && req.query.interviewTemplate.toString() || '';
        const stepsOfInterviewTemplate = await getInterviewTemplateStepByInterviewTemplateUseCase.execute(interviewTemplate);
        res.json(stepsOfInterviewTemplate);
    });
});

stepRouter.put('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplateStep = await updateInterviewTemplateStepUseCase.execute({
            id: req.params.id,
            name: req.body.name,
            interviewTemplateId: req.body.interviewTemplateId
        });
        res.json(interviewTemplateStep);
    });
});

stepRouter.delete('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplateStep = await deleteInterviewTemplateStepUseCase.execute(req.params.id);
        res.json(interviewTemplateStep);
    });
});

export default stepRouter;