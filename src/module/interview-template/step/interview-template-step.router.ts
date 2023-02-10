import {Request, Router} from "express";

import {auth} from "@infrastructure/middleware/auth";
import {tryExecute} from "@infrastructure/utils/tryExecute";

import {getInterviewTemplateStepContext} from "./config/factory";
import {InterviewTemplateStep} from "./core/model/InterviewTemplateStep";
import {CreateInterviewTemplateStep} from "./core/model/CreateInterviewTemplateStep";

const interviewTemplateStepRouter = Router();
const {
    createInterviewTemplateStepUseCase,
    getInterviewTemplateStepByInterviewTemplateUseCase,
    updateInterviewTemplateStepUseCase,
    deleteInterviewTemplateStepUseCase,
} = getInterviewTemplateStepContext();

interviewTemplateStepRouter.post('/', auth, async (req: Request<{}, InterviewTemplateStep, CreateInterviewTemplateStep>, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplateStep = await createInterviewTemplateStepUseCase.execute({
            name: req.body.name,
            interviewTemplateId: req.body.interviewTemplateId,
        });
        res.json(interviewTemplateStep);
    });
});

interviewTemplateStepRouter.get('/', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplate = req.query.interviewTemplate && req.query.interviewTemplate.toString() || '';
        const stepsOfInterviewTemplate = await getInterviewTemplateStepByInterviewTemplateUseCase.execute(interviewTemplate);
        res.json(stepsOfInterviewTemplate);
    });
});

interviewTemplateStepRouter.put('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplateStep = await updateInterviewTemplateStepUseCase.execute({
            id: req.params.id,
            name: req.body.name,
            interviewTemplateId: req.body.interviewTemplateId
        });
        res.json(interviewTemplateStep);
    });
});

interviewTemplateStepRouter.delete('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplateStep = await deleteInterviewTemplateStepUseCase.execute(req.params.id);
        res.json(interviewTemplateStep);
    });
});

export default interviewTemplateStepRouter;