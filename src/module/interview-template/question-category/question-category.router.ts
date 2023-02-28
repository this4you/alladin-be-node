import {Request, Router} from "express";

import {auth} from "@infrastructure/middleware/auth";
import {tryExecute} from "@infrastructure/utils/tryExecute";

import {getQuestionCategoryContext} from "@module/interview-template/question-category/config/factory";
import {QuestionCategory} from "@module/interview-template/question-category/core/model/QuestionCategory";

const questionCategoryRouter = Router();

const {
    getAllQuestionCategories,
} = getQuestionCategoryContext();

questionCategoryRouter.get('/', auth, async (req: Request<{}, QuestionCategory[]>, res, next) => {
    await tryExecute(next, async () => {
        const questionCategories = await getAllQuestionCategories.execute();
        res.json(questionCategories);
    });
});

export default questionCategoryRouter;
