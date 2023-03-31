import { NextFunction, Request, Response } from 'express';

import { getUserContext } from '@module/auth/user/config/factory';

const { verifyTokenUseCase } = getUserContext();

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers['authorization'] || '';
    const token = bearerToken.split(' ')[1] || '';

    req.user = verifyTokenUseCase.execute(token);

    return next()
}