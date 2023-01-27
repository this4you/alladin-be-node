import { Router } from 'express';
import { Request } from 'express';
import { getUserContext } from './config/factory';
import { AuthUser } from './core/model/AuthUser';
import { Token } from './core/model/Token';
import { auth } from '../../../infrastructure/middleware/auth';
import {tryExecute} from "../../../infrastructure/utils/tryExecute";

const userRouter = Router();
const { authUseCase, getUserUseCase } = getUserContext();

userRouter.post('/auth', async (req: Request<{}, Token, AuthUser>, res, next) => {
    /*
    #swagger.tags = ['auth']
    #swagger.summary = 'Auth user into the system'
    #swagger.description = 'Returns user x-access-token'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        description: 'Add company and user',
        schema: {
            email: "test.user@mail.com",
            password: "TestPa$$word43"
        }
    }
    #swagger.responses[200] = {
        description: 'Company successfully created.',
        schema: {token: 'x-access-token', refreshToken: ''}
     }*/
    await tryExecute(next, async () => {
        const token = await authUseCase.execute({
            email: req.body.email,
            password: req.body.password
        });
        return res.send(token);
    });
});

userRouter.get('/', auth, async (req: Request, res, next) => {
    /*
    #swagger.tags = ['auth']
    #swagger.summary = 'Find user by x-access-token'
    #swagger.description = 'Returns a single user object'
    #swagger.parameters['x-access-token'] = {
        in: 'header',
        required: true,
        description: 'Add user x-access-token'
    }
    #swagger.responses[200] = {
        description: 'Company successfully obtained.',
        schema: {token: 'x-access-token', refreshToken: ''}
     }*/
    await tryExecute(next, async () => {
        const user = await getUserUseCase.execute(req.user.userId);
        res.json(user);
    });
});

export default userRouter;
