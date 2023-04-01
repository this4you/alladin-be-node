import { Router, Request } from 'express';

import { auth } from '@infrastructure/middleware/auth';
import { tryExecute } from "@infrastructure/utils/tryExecute";

import { getUserContext } from './config/factory';
import { AuthUser } from './core/model/AuthUser';
import { Token } from './core/model/Token';

const userRouter = Router();
const { authUseCase, getUserUseCase } = getUserContext();

userRouter.post('/auth', async (req: Request<AuthUser, Token>, res, next) => {
    await tryExecute(next, async () => {
        const token = await authUseCase.execute(req.body);

        return res.send(token);
    });
});

userRouter.get('/', auth, async (req: Request, res, next) => {
    await tryExecute(next, async () => {
        const user = await getUserUseCase.execute(req.user.userId);

        res.json(user);
    });
})

export default userRouter;
