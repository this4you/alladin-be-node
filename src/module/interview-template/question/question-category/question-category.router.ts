import {Request, Router} from "express";
import {auth} from "../../../../infrastructure/middleware/auth";
import {tryExecute} from "../../../../infrastructure/utils/tryExecute";
import {getQuestionCategoryContext} from "./config/factory";
import {QuestionCategory} from "./core/model/QuestionCategory";

const questionCategoryRouter = Router();

export default questionCategoryRouter;

const {
    getAllQuestionCategory,
} = getQuestionCategoryContext();

questionCategoryRouter.get('/', auth, async (req: Request<{}, QuestionCategory[]>, res, next) => {
    // #swagger.tags = ['interview-template']
    // #swagger.summary = 'Get all questionCategories'
    // #swagger.description = 'Returns questionCategories array'
    await tryExecute(next, async () => {
        const questionCategories = await getAllQuestionCategory.execute();
        res.json(questionCategories);
    });
});