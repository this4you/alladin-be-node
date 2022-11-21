import { NextFunction, Request, Response } from 'express';
import { getUserContext } from '../../module/user/config/factory';
import { IUserRequest } from '../models/IUserRequest';

const { verifyTokenUseCase} = getUserContext();

export const auth = (req: IUserRequest, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || '';
    req.user  = verifyTokenUseCase.execute(token);
}