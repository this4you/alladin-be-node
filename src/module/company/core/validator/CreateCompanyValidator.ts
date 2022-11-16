import { Validator } from '../../../../lib/model/Validator';
import { CreateCompany } from '../model/CreateCompany';
import { ValidatorUtils } from '../../../../lib/utils/ValidatorUtils';

export class CreateCompanyValidator implements Validator<CreateCompany> {
    constructor(
        private validateUtils: ValidatorUtils
    ) {}

    validate(data: CreateCompany): void {
        this.validateUtils.validate('name', data.name)
            .required()
            .maxLength(50);

        this.validateUtils.validate('user.email', data.user.email)
            .required()
            .email();

        this.validateUtils.validate('user.password', data.user.password)
            .required()
            .password();

        this.validateUtils.validate('user.companyRoleId', data.user.companyRoleId)
            .required();
    }
}