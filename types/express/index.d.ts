declare namespace Express {
    enum UserRole {
        ADMIN = 'admin',
        USER = 'user'
    }
    type TokenUser = {
        userId: string;
        userRole: UserRole;
    }
    export interface Request {
        user: TokenUser
    }
}