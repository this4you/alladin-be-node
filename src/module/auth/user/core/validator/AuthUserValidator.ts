import { Validator } from '@lib/model/Validator';
import { ValidatorUtils } from '@lib/utils/ValidatorUtils';

import { AuthUser } from '../model/AuthUser';

export class AuthUserValidator implements Validator<AuthUser> {
    constructor(
        protected validateUtils: ValidatorUtils
    ) {}
    validate(data: AuthUser): void {
        this.validateUtils.validate('password', data.password)
            .required()
            .maxLength(50);

        this.validateUtils.validate('email', data.email)
            .required()
            .email();
    }

}