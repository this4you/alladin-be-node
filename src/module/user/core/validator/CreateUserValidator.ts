import { Validator } from '../../../../lib/model/Validator';
import { CreateUser } from '../model/CreateUser';
import { ValidatorUtils } from '../../../../lib/utils/ValidatorUtils';

export class CreateUserValidator implements Validator<CreateUser> {
    constructor(
        protected validateUtils: ValidatorUtils
    ) {
    }
    validate(data: CreateUser): void {
        this.validateUtils.validate('name', data.name)
            .notEmpty()
            .maxLength(50);

        this.validateUtils.validate('email', data.email)
            .notEmpty()
            .email();

        this.validateUtils.validate('password', data.password)
            .notEmpty()
            .password();

        this.validateUtils.validate('companyId', data.companyId)
            .notEmpty();

        this.validateUtils.validate('roleId', data.roleId)
            .notEmpty();

        this.validateUtils.validate('companyRoleId', data.companyRoleId)
            .notEmpty();
    }

}