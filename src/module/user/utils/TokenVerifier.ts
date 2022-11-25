import { TokenVerifier } from '../core/port/TokenVerifier';
import { TokenUser } from '../core/model/TokenUser';
import jwt from 'jsonwebtoken';

export class JWTVerify implements TokenVerifier {
    verify(token: string): TokenUser {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as TokenUser;

        return {
            userId: decoded.userId,
            userRole: decoded.userRole
        };
    }

}