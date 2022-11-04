import { UserRole } from './UserRole';

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    companyId: string;
    companyRoleId: string;
    roleId: UserRole;
}