import {Request, Router} from "express";
import {getQuestionCategoryInStepContext} from "./config/factory";
import {auth} from "../../../../infrastructure/middleware/auth";
import {tryExecute} from "../../../../infrastructure/utils/tryExecute";

import {QuestionCategoryInStep} from "./core/model/QuestionCategoryInStep";

const questionCategoryInStepRouter = Router();
const {
    createQuestionCategoryInStepUseCase,
    deleteQuestionCategoryInStepUseCase,
    getQuestionCategoriesInStepUseCase
} = getQuestionCategoryInStepContext()

questionCategoryInStepRouter.post('/', auth, async (req: Request<{}, QuestionCategoryInStep>, res, next) => {
    // #swagger.tags = ['interview-template']
    // #swagger.summary = 'Create questionCategoryInStep by step'
    // #swagger.description = 'Returns step id and name'
    await tryExecute(next, async () => {
       const questionCategoryInStep = await createQuestionCategoryInStepUseCase.execute({
           questionCategoryId: req.body.questionCategoryId,
           interviewTemplateStepId: req.body.interviewTemplateStepId
       });

       return res.send(questionCategoryInStep)
   });
});

questionCategoryInStepRouter.get('/', auth, async (req: Request<{}, QuestionCategoryInStep[]>, res, next) => {
    // #swagger.tags = ['interview-template']
    // #swagger.summary = 'Get all questionCategoriesInStep'
    // #swagger.description = 'Returns questionCategoriesInStep array'
    await tryExecute(next, async () => {
        const questionCategoriesInStep = await getQuestionCategoriesInStepUseCase.execute(req.body.interviewTemplateStepId);
        res.json(questionCategoriesInStep);
    });
});

questionCategoryInStepRouter.delete('/:id', auth, async (req, res, next) => {
    // #swagger.tags = ['interview-template']
    // #swagger.summary = 'Delete questionCategoryInStep by ID'
    // #swagger.description = ''
    await tryExecute(next, async () => {
        const questionCategoryInStep = await deleteQuestionCategoryInStepUseCase.execute(req.params.id);
        res.json(questionCategoryInStep);
    });
});

export default questionCategoryInStepRouter;