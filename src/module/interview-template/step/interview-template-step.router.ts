import {Request, Router} from "express";
import {getInterviewTemplateStepContext} from "./config/factory";
import {auth} from "../../../infrastructure/middleware/auth";
import {tryExecute} from "../../../infrastructure/utils/tryExecute";

import {InterviewTemplateStep} from "./core/model/InterviewTemplateStep";
import {CreateInterviewTemplateStep} from "./core/model/CreateInterviewTemplateStep";

const interviewTemplateStepRouter = Router();
const {
    createInterviewTemplateStepUseCase,
    deleteInterviewTemplateStepUseCase,
    updateInterviewTemplateStepUseCase,
    getInterviewTemplateStepByInterviewTemplateUseCase,
} = getInterviewTemplateStepContext();

interviewTemplateStepRouter.post('/', auth, async (req: Request<{}, InterviewTemplateStep, CreateInterviewTemplateStep>, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplateStep = await createInterviewTemplateStepUseCase.execute({
            name: req.body.name,
            interviewTemplateId: req.body.interviewTemplateId,
        });

        return res.send(interviewTemplateStep);
    });
});

interviewTemplateStepRouter.get('/', auth, async (req: Request<{}, InterviewTemplateStep[]>, res, next) => {
    await tryExecute(next, async () => {
        const stepsOfInterviewTemplate = await getInterviewTemplateStepByInterviewTemplateUseCase.execute(req.body.interviewTemplateId);
        res.json(stepsOfInterviewTemplate);
    });
});

interviewTemplateStepRouter.delete('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplateStep = await deleteInterviewTemplateStepUseCase.execute(req.params.id);
        res.json(interviewTemplateStep);
    });
});

interviewTemplateStepRouter.put('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplateStep = await updateInterviewTemplateStepUseCase.execute({
            id: req.params.id,
            name: req.body.name
        });
        res.json(interviewTemplateStep);
    });
});

export default interviewTemplateStepRouter;