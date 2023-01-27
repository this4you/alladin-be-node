import { Request, Router } from 'express';
import { getInterviewTemplateContext } from './config/factory';
import { auth } from '../../../infrastructure/middleware/auth';
import { tryExecute } from '../../../infrastructure/utils/tryExecute';

import { CreateInterviewTemplate } from './core/model/CreateInterviewTemplate';
import { InterviewTemplate } from './core/model/InterviewTemplate';

const interviewTemplateRouter = Router();
const {
    createInterviewTemplateUseCase,
    getInterviewTemplateByCompanyUseCase,
    updateInterviewTemplateUseCase,
    deleteInterviewTemplateUseCase
} = getInterviewTemplateContext();

interviewTemplateRouter.post('/', auth, async (req: Request<{}, InterviewTemplate, Omit<CreateInterviewTemplate, 'companyId'>>, res, next) => {
    /*
    #swagger.tags = ['interview-template']
    #swagger.summary = 'Create interview-template by companyId'
    #swagger.description = 'Returns interview-template id and name'
    #swagger.parameters['x-access-token'] = {
        in: 'header',
        required: true,
        description: 'Add user x-access-token'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        description: 'Add InterviewTemplate name',
        schema: {
            name: 'Auto QA'
        }
     }
     #swagger.responses[200] = {
        description: 'InterviewTemplate successfully created.',
        schema: {id: 'uuid4', name: 'Auto QA'}
     }*/
    await tryExecute(next, async () => {
        const interviewTemplate = await createInterviewTemplateUseCase.execute({
            name: req.body.name,
            companyId: req.user.companyId,
        });

        return res.send(interviewTemplate);
    });
});

interviewTemplateRouter.get('/', auth, async (req: Request<{}, InterviewTemplate[]>, res, next) => {
    /*
    #swagger.tags = ['interview-template']
    #swagger.summary = 'Get all interview-templates by companyId'
    #swagger.description = 'Returns interview-templates array'
    #swagger.parameters['x-access-token'] = {
        in: 'header',
        required: true,
        description: 'Add user x-access-token'
    }
    #swagger.responses[200] = {
        description: 'InterviewTemplates successfully obtained.',
        schema: [{id: 'uuid4', name: 'Auto QA'}]
     }*/
    await tryExecute(next, async () => {
        const companyInterviewTemplates = await getInterviewTemplateByCompanyUseCase.execute(req.user.companyId);
        res.json(companyInterviewTemplates);
    });
});

interviewTemplateRouter.put('/:id', auth, async (req, res, next) => {
    /*
    #swagger.tags = ['interview-template']
    #swagger.summary = 'Update interview-template by ID'
    #swagger.description = 'Returns interview-template id and name'
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'InterviewTemplate ID',
     }
    #swagger.parameters['x-access-token'] = {
        in: 'header',
        required: true,
        description: 'Add user x-access-token'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        description: 'Add InterviewTemplate name',
        schema: {
            name: 'Frontend Developer'
        }
    }
    #swagger.responses[200] = {
            description: 'InterviewTemplate successfully updated.',
            schema: [{id: 'uuid4', name: 'Frontend Developer'}]
    }*/
    await tryExecute(next, async () => {
        const interviewTemplate = await updateInterviewTemplateUseCase.execute({
            id: req.params.id,
            name: req.body.name
        });
        res.json(interviewTemplate);
    });
});

interviewTemplateRouter.delete('/:id', auth, async (req, res, next) => {
    /*
    #swagger.tags = ['interview-template']
    #swagger.summary = 'Delete interview-template by ID'
    #swagger.description = ''
    #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        description: 'InterviewTemplate ID',
     }
    #swagger.parameters['x-access-token'] = {
        in: 'header',
        required: true,
        description: 'Add user x-access-token'
    }
    #swagger.responses[200] = {
            description: 'InterviewTemplate successfully deleted.'
    }*/
    await tryExecute(next, async () => {
        const interviewTemplate = await deleteInterviewTemplateUseCase.execute(req.params.id);
        res.json(interviewTemplate);
    });
});

export default interviewTemplateRouter;