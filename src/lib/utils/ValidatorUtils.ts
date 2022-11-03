import validator from 'validator';

class ValidationError extends Error {
    constructor(
        field: string,
        validationText?: string
    ) {
        const errorText = `Field is not valid: ${field}. Message:${validationText ?? '...'}`
        super(errorText);
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