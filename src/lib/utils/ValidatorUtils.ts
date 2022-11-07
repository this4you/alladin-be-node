import validator from 'validator';
import { BaseException } from '../model/BaseException';

class ValidationError extends BaseException {
    constructor(
        field: string,
        validationText?: string
    ) {
        const errorText = `Field is not valid: ${field}. Message: ${validationText ?? '...'}`
        super(errorText, 400);
    }
}

export class ValidatorUtils {
    validate(field: string, value: any) {
       return new ValidatorFieldUtils(field, value);
    }
}

class ValidatorFieldUtils {
    constructor(
        private fieldName: string,
        private fieldValue: any
    ) {}

    email() {
        if (!this.fieldValue) {
            return this;
        }

        if (validator.isEmail(this.fieldValue)) {
            return this;
        }

        throw new ValidationError(this.fieldName, 'Incorrect email');
    }

    notEmpty() {
        if (this.fieldValue === 0 || this.fieldValue) {
            return this;
        }

        throw new ValidationError(this.fieldName, 'Value is empty');
    }

    maxLength(max: number) {
        if (this.fieldValue.toString().length <= max) {
            return this;
        }

        throw new ValidationError(this.fieldName, `Max length ${max}`);
    }

    password() {
        if (!this.fieldValue) {
            return this;
        }

        if (validator.isStrongPassword(this.fieldValue, {
            minLength: 8,
            minSymbols: 0
        })) {
            return this;
        }

        throw new ValidationError(this.fieldName, `You need to create another password`);
    }
}