import {Request, Router} from "express";
import {auth} from "@infrastructure/middleware/auth";
import {tryExecute} from "@infrastructure/utils/tryExecute";
import {getQuestionContext} from "@module/interview-template/question/config/factory";
import {Question} from "@module/interview-template/question/core/model/Question";
import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";

const questionRouter = Router();
const {
    createQuestionUseCase,
    updateQuestionUseCase,
    deleteQuestionUseCase,
    patchPositionQuestionUseCase
} = getQuestionContext();

questionRouter.post('/', auth, async (req: Request<{}, Question, CreateQuestion>, res, next) => {
    await tryExecute(next, async () => {
        const question = await createQuestionUseCase.execute({
            text: req.body.text,
            stepCategoryId: req.body.stepCategoryId
        });
        res.json(question);
    });
});

questionRouter.put('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const question = await updateQuestionUseCase.execute({
            id: req.params.id,
            text: req.body.text,
            stepCategoryId: req.body.stepCategoryId
        });
        res.json(question);
    });
});

questionRouter.delete('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const question = await deleteQuestionUseCase.execute(req.params.id);
        res.json(question);
    });
});

questionRouter.patch('/:id', auth, async (req, res, next) => {
    await tryExecute(next, async () => {
        const question = await patchPositionQuestionUseCase.execute({
            id: req.params.id,
            position: req.body.position
        });
        res.json(question);
    });
});

export default questionRouter;