import validator from 'validator';
import { BaseException } from '../model/BaseException';

class ValidationError extends BaseException {
    constructor(
        field: string,
        validationText?: string
    ) {
        const errorText = `Field is not valid: ${field}. Message:${validationText ?? '...'}`
        super(errorText, 400);
    }
}

export class ValidatorUtils {
    email(field: string, email: string) {
        if (validator.isEmail(email)) {
            return;
        }

        throw new ValidationError(field);
    }
}