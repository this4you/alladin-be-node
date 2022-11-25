import { NextFunction, Request, Response } from 'express';
import { getUserContext } from '../../module/user/config/factory';

const { verifyTokenUseCase } = getUserContext();

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers['x-access-token'] || '';

    req.user = verifyTokenUseCase.execute(token);

    return next()
}