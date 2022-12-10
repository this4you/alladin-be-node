import { BaseException } from '../../lib/model/app-exception/BaseException';
import { NextFunction, Request, Response } from 'express';
import { ValidationException } from '../../lib/model/app-exception/ValidationException';

export const errorHandler = (err: BaseException, req: Request, res: Response, next: NextFunction) => {
    let responseError;

    switch (true) {
        case err instanceof ValidationException:
            responseError = { code: 1, string: err.message }
            break;
        default:
            responseError = { code: 9, string: err.message }
    }

    res.status(err.statusCode || 400).json(responseError)
}