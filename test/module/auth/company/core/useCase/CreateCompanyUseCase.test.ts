import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { createMock } from 'ts-auto-mock';

import { Validator } from '@lib/model/Validator';
import { UserRole } from '@lib/model/UserRole';
import { CreateUser } from '@module/auth/user/core/model/CreateUser';
import { CreateUserUseCase } from '@module/auth/user/core/useCase/CreateUserUseCase';
import { Company } from '@module/auth/company/core/model/Company';
import { CreateCompany } from '@module/auth/company/core/model/CreateCompany';
import { CompanyRepository } from '@module/auth/company/core/port/CompanyRepository';
import { CreateCompanyUseCase } from '@module/auth/company/core/useCase/CreateCompanyUseCase';

describe('CreateCompanyUseCase test', function () {
    it('should create company', async () => {
        //Given
        const createUserUseCase = mock<CreateUserUseCase>();
        const createCompanyRepository = mock<CompanyRepository>();
        const validateUtils = mock<Validator<CreateCompany>>();

        const createCompany = createMock<CreateCompany>();
        const expected = createMock<Company>({
            name: createCompany.name
        });
        const createUserModel = createMock<CreateUser>({
            ...createCompany.user,
            companyId: expected.id,
            role: UserRole.ADMIN
        });

        const useCase = new CreateCompanyUseCase(
            instance(createUserUseCase),
            instance(createCompanyRepository),
            instance(validateUtils)
        );

        when(createCompanyRepository.createCompany(anything())).thenResolve(expected);

        //When
        const actual = await useCase.execute(createCompany);

        //Then
        expect(expected).toEqual(actual);

        verify(createUserUseCase.execute(deepEqual(createUserModel))).once();
        verify(createCompanyRepository.createCompany(deepEqual(createCompany))).once();
    })
});