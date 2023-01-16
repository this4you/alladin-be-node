import {Request, Router} from "express";
import {getInterviewTemplateContext} from "./config/factory";
import {auth} from "../../infrastructure/middleware/auth";
import {CreateInterviewTemplate} from "./core/model/CreateInterviewTemplate";
import {InterviewTemplate} from "./core/model/InterviewTemplate";
import {InterviewTemplateEntity} from "../../db/postgre/entities/InterviewTemplateEntity";

const interviewTemplateRouter = Router();
const {createInterviewTemplateUseCase, getInterviewTemplateByCompanyUseCase} = getInterviewTemplateContext();

interviewTemplateRouter.post('/', auth, async (req: Request<{}, InterviewTemplate, Omit<CreateInterviewTemplate, 'companyId'>>, res, next) => {
    try {
        const interviewTemplate = await createInterviewTemplateUseCase.execute({
            name: req.body.name,
            companyId: req.user.companyId,
        });
        return res.send(interviewTemplate);
    } catch (e) {
        next(e);
    }
});

interviewTemplateRouter.get('/', auth, async (req: Request<{}, InterviewTemplateEntity[]>, res, next) => {
    try {
        const companyInterviewTemplates = await getInterviewTemplateByCompanyUseCase.execute(req.body.companyId);
        res.json(companyInterviewTemplates);
    } catch (e) {
        next(e);
    }
})

export default interviewTemplateRouter