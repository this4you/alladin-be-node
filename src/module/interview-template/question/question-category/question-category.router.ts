import {Request, Router} from "express";

import {auth} from "@infrastructure/middleware/auth";
import {tryExecute} from "@infrastructure/utils/tryExecute";

import {getQuestionCategoryContext} from "./config/factory";
import {QuestionCategory} from "./core/model/QuestionCategory";

const questionCategoryRouter = Router();

export default questionCategoryRouter;

const {
    getAllQuestionCategories,
} = getQuestionCategoryContext();

questionCategoryRouter.get('/', auth, async (req: Request<{}, QuestionCategory[]>, res, next) => {
    await tryExecute(next, async () => {
        const questionCategories = await getAllQuestionCategories.execute();
        res.json(questionCategories);
    });
});