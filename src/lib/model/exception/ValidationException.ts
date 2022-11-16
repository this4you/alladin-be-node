import { BaseException } from './BaseException';

export class ValidationException extends BaseException {
    constructor(
        field: string,
        validationText?: string
    ) {
        const errorText = `Field is not valid: ${field}. Message: ${validationText ?? '...'}`
        super(errorText, 400);
    }
}