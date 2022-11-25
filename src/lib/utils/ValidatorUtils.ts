import validator from 'validator';
import { ValidationException } from '../model/exception/ValidationException';


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

        throw new ValidationException(this.fieldName, 'Incorrect email');
    }

    required() {
        if (this.fieldValue === 0 || this.fieldValue) {
            return this;
        }

        throw new ValidationException(this.fieldName, 'Value is empty');
    }

    maxLength(max: number) {
        if (this.fieldValue.toString().length <= max) {
            return this;
        }

        throw new ValidationException(this.fieldName, `Max length ${max}`);
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

        throw new ValidationException(this.fieldName, `You need to create another password`);
    }
}