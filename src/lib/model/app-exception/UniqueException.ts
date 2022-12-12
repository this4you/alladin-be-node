import { BaseException } from './BaseException';

export class UniqueException extends BaseException {
    constructor(
        message: string
    ) {
        const errorText = `Data exists: ${message}`
        super(errorText, 400);
    }
}