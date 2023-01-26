import { UserRole } from '../../../../../lib/model/UserRole';

export type TokenUser = {
    userId: string;
    userRole: UserRole;
    companyId: string;
}