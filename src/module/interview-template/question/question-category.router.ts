import {Request, Router} from "express";

import {auth} from "@infrastructure/middleware/auth";
import {tryExecute} from "@infrastructure/utils/tryExecute";

import { getQuestionContext } from './config/factory';
import {Question} from "@module/interview-template/question/core/model/Question";

const questionRouter = Router();
const {
    createQuestion,
    updateQuestion,
    deleteQuestion
} = getQuestionContext();

questionRouter.post('/', auth, async (req: Request<{}, Question>, res, next) => {
    await tryExecute(next, async () => {
        const question = await createQuestion.execute({
            text: req.body.text,
            questionCategoryId: req.body.questionCategoryId,
        });
        res.json(question);
    });
});

questionRouter.put('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const question = await updateQuestion.execute({
            id: req.params.id,
            text: req.body.text,
            questionCategoryId: req.body.questionCategoryId
        });
        res.json(question);
    });
});

questionRouter.delete('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const question = await deleteQuestion.execute(req.params.id);
        res.json(question);
    });
});

export default questionRouter;