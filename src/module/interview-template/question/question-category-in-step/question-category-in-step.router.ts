import {Request, Router} from "express";

import {auth} from "@infrastructure/middleware/auth";
import {tryExecute} from "@infrastructure/utils/tryExecute";

import {getQuestionCategoryInStepContext} from "./config/factory";
import {QuestionCategoryInStep} from "./core/model/QuestionCategoryInStep";

const questionCategoryInStepRouter = Router();
const {
    createQuestionCategoryInStepUseCase,
    deleteQuestionCategoryInStepUseCase,
    getQuestionCategoriesInStepUseCase
} = getQuestionCategoryInStepContext()

questionCategoryInStepRouter.post('/', auth, async (req: Request<{}, QuestionCategoryInStep>, res, next) => {
   await tryExecute(next, async () => {
       const questionCategoryInStep = await createQuestionCategoryInStepUseCase.execute({
           questionCategoryId: req.body.questionCategoryId,
           interviewTemplateStepId: req.body.interviewTemplateStepId
       });
       res.json(questionCategoryInStep)
   });
});

questionCategoryInStepRouter.get('/', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const interviewTemplateStep = req.query.interviewTemplateStep && req.query.interviewTemplateStep.toString() || '';
        const questionCategoryInStep = await getQuestionCategoriesInStepUseCase.execute(interviewTemplateStep);
        res.json(questionCategoryInStep);
    });
});

questionCategoryInStepRouter.delete('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const questionCategoryInStep = await deleteQuestionCategoryInStepUseCase.execute(req.params.id);
        res.json(questionCategoryInStep);
    });
});

export default questionCategoryInStepRouter;