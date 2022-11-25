import { TokenGenerator } from '../core/port/TokenGenerator';
import { User } from '../core/model/User';
import { Token } from '../core/model/Token';
import jwt from 'jsonwebtoken';
import { TokenUser } from '../core/model/TokenUser';

export class JWTGenerator implements TokenGenerator {
    generate(user: User): Token {
        const payload: TokenUser = {
            userId: user.id,
            userRole: user.roleId
        }
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET || '',
            {
                expiresIn: '1h'
            }
        );
        return {
            token,
            refreshToken: ''
        };
    }
}