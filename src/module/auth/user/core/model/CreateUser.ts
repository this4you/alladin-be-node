import { UserRole } from '@lib/model/UserRole';

export type CreateUser = {
    name: string;
    email: string;
    password: string;
    companyId: string;
    role: UserRole;
    companyRoleId: string;
}