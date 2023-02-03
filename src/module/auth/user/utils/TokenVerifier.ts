import jwt from 'jsonwebtoken';

import { TokenVerifier } from '../core/port/TokenVerifier';
import { TokenUser } from '../core/model/TokenUser';

export class JWTVerify implements TokenVerifier {
    verify(token: string): TokenUser {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as TokenUser;

        return {
            userId: decoded.userId,
            userRole: decoded.userRole,
            companyId: decoded.companyId
        };
    }

}