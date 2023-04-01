import jwt from 'jsonwebtoken';

import { TokenVerifier } from '../core/port/TokenVerifier';
import { TokenUser } from '../core/model/TokenUser';
import { JWT_SECRET } from "secret";

export class JWTVerify implements TokenVerifier {
    verify(token: string): TokenUser {
        const decoded = jwt.verify(token, JWT_SECRET || '') as TokenUser;

        return {
            userId: decoded.userId,
            userRole: decoded.userRole,
            companyId: decoded.companyId
        };
    }

}