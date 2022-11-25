import { Router } from 'express';
import { Request } from 'express';
import { getUserContext } from './config/factory';
import { AuthUser } from './core/model/AuthUser';
import { Token } from './core/model/Token';
import { auth } from '../../infrastructure/middleware/auth';

const userRouter = Router();
const { authUseCase } = getUserContext();

userRouter.post('/auth', async (req: Request<{}, Token, AuthUser>, res, next) => {
    try {
        const token = await authUseCase.execute(req.body);

        return res.send(token);
    } catch (e) {
        next(e);
    }
});

userRouter.get('/', auth, async (req: Request, res, next) => {
    try {
        console.log('AUTH_SUCCESS', req.user);

        res.send(req.user);
    } catch (e) {
        next(e);
    }
})

export default userRouter;
