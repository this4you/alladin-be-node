import { Request, Router } from 'express';

import { auth } from '@infrastructure/middleware/auth';
import { tryExecute } from '@infrastructure/utils/tryExecute';

import { getInterviewTemplateContext } from './config/factory';
import { CreateInterviewTemplate } from './core/model/CreateInterviewTemplate';
import { InterviewTemplate } from './core/model/InterviewTemplate';

const interviewTemplateRouter = Router();
const {
    createInterviewTemplateUseCase,
    getInterviewTemplateByCompanyUseCase,
    updateInterviewTemplateUseCase,
    deleteInterviewTemplateUseCase
} = getInterviewTemplateContext();

interviewTemplateRouter.post('/', auth, async (req: Request<InterviewTemplate, Omit<CreateInterviewTemplate, 'companyId'>>, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplate = await createInterviewTemplateUseCase.execute({
            name: req.body.name,
            companyId: req.user.companyId,
        });
        res.json(interviewTemplate);
    });
});

interviewTemplateRouter.get('/', auth, async (req: Request<InterviewTemplate, InterviewTemplate[]>, res, next) => {
    await tryExecute(next, async () => {
        const companyInterviewTemplates = await getInterviewTemplateByCompanyUseCase.execute(req.user.companyId);
        res.json(companyInterviewTemplates);
    });
});

interviewTemplateRouter.put('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplate = await updateInterviewTemplateUseCase.execute({
            id: req.params.id,
            name: req.body.name,
            companyId: req.user.companyId
        });
        res.json(interviewTemplate);
    });
});

interviewTemplateRouter.delete('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        await deleteInterviewTemplateUseCase.execute(req.params.id);
        res.json();
    });
});

export default interviewTemplateRouter;