import { Request } from 'express';
import { TokenUser } from '../../module/user/core/model/TokenUser';
import * as core from 'express-serve-static-core';

export interface IUserRequest<P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
    user: TokenUser
}