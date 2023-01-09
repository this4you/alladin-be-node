import { UserRole } from '../../../../lib/model/UserRole';

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    companyId: string;
    role: UserRole;
}