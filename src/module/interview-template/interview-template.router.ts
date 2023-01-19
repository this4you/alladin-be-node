import { Request, Router } from 'express';
import { getInterviewTemplateContext } from './config/factory';
import { auth } from '../../infrastructure/middleware/auth';
import { CreateInterviewTemplate } from './core/model/CreateInterviewTemplate';
import { InterviewTemplate } from './core/model/InterviewTemplate';
import { tryExecute } from '../../infrastructure/utils/tryExecute';

const interviewTemplateRouter = Router();
const {
    createInterviewTemplateUseCase,
    getInterviewTemplateUseCase,
    getInterviewTemplateByCompanyUseCase,
    updateInterviewTemplateUseCase,
    deleteInterviewTemplateUseCase
} = getInterviewTemplateContext();

interviewTemplateRouter.post('/', auth, async (req: Request<{}, InterviewTemplate, Omit<CreateInterviewTemplate, 'companyId'>>, res, next) => {
    tryExecute(next, async () => {
        const interviewTemplate = await createInterviewTemplateUseCase.execute({
            name: req.body.name,
            companyId: req.user.companyId,
        });

        return res.send(interviewTemplate);
    });
});

interviewTemplateRouter.get('/', auth, async (req: Request<{}, InterviewTemplate[]>, res, next) => {
    try {
        const companyInterviewTemplates = await getInterviewTemplateByCompanyUseCase.execute(req.body.companyId);
        res.json(companyInterviewTemplates);
    } catch (e) {
        next(e);
    }
})

interviewTemplateRouter.get('/:id', auth, async (req, res, next) => {
    try {
        const interviewTemplate = await getInterviewTemplateUseCase.execute(req.params.id);
        res.json(interviewTemplate);
    } catch (e) {
        next(e);
    }
})

interviewTemplateRouter.delete('/:id', auth, async (req, res, next) => {
    try {
        const interviewTemplate = await deleteInterviewTemplateUseCase.execute(req.params.id);
        res.json(interviewTemplate);
    } catch (e) {
        next(e);
    }
})

interviewTemplateRouter.put('/:id', auth, async (req, res, next) => {
    try {
        const interviewTemplate = await updateInterviewTemplateUseCase.execute({
            id: req.params.id,
            name: req.body.name
        });
        res.json(interviewTemplate);
    } catch (e) {
        next(e);
    }
})

export default interviewTemplateRouter