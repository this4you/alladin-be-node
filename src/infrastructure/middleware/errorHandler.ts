import { Request, Response } from 'express';

import { BaseException } from '@lib/model/app-exception/BaseException';
import { ValidationException } from '@lib/model/app-exception/ValidationException';

export const errorHandler = (err: BaseException, req: Request, res: Response) => {
    let responseError;

    switch (true) {
        case err instanceof ValidationException:
            responseError = { code: 1, message: err.message }
            break;
        default:
            responseError = { code: 9, message: err.message }
    }

    res.status(err.statusCode || 400).json(responseError)
}