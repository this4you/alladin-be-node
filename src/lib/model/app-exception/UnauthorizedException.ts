import { BaseException } from './BaseException';

export class UnauthorizedException extends BaseException {
    constructor() {
        const errorText = `Lacks valid authentication credentials for the requested resource`
        super(errorText, 401);
    }
}