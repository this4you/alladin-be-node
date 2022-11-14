import { CreateUserUseCase } from '../../../../../src/module/user/core/useCase/CreateUserUseCase';
import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { CreateCompanyRepository } from '../../../../../src/module/company/core/port/CreateCompanyRepository';
import { Validator } from '../../../../../src/lib/model/Validator';
import { CreateCompany } from '../../../../../src/module/company/core/model/CreateCompany';
import { CreateCompanyUseCase } from '../../../../../src/module/company/core/useCase/CreateCompanyUseCase';
import { createMock } from 'ts-auto-mock';
import { Company } from '../../../../../src/module/company/core/model/Company';
import { CreateUser } from '../../../../../src/module/user/core/model/CreateUser';
import { UserRole } from '../../../../../src/module/user/core/model/UserRole';

describe('CreateCompanyUseCase test', function () {
    it('should create company', async () => {
        //Given
        const createUserUseCase = mock<CreateUserUseCase>();
        const createCompanyRepository = mock<CreateCompanyRepository>();
        const validateUtils = mock<Validator<CreateCompany>>();

        const createCompany = createMock<CreateCompany>();
        const expected = createMock<Company>({
            name: createCompany.name
        });
        const createUserModel = createMock<CreateUser>({
            ...createCompany.user,
            companyId: expected.id,
            roleId: UserRole.ADMIN
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