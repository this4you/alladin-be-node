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
            .required()
            .maxLength(50);

        this.validateUtils.validate('email', data.email)
            .required()
            .email();

        this.validateUtils.validate('password', data.password)
            .required()
            .password();

        this.validateUtils.validate('companyId', data.companyId)
            .required();

        this.validateUtils.validate('roleId', data.role)
            .required();

        this.validateUtils.validate('companyRoleId', data.companyRoleId)
            .required();
    }

}