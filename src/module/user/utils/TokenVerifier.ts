import { TokenVerifier } from '../core/port/TokenVerifier';
import { TokenUser } from '../core/model/TokenUser';
import jwt from 'jsonwebtoken';
import { UserRole } from '../../../lib/model/UserRole';

export class JWTVerify implements TokenVerifier {
    verify(token: string): TokenUser {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        console.log('DECODED', decoded);
        return {
            userId: '',
            userRole: UserRole.ADMIN
        };
    }

}