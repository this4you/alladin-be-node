import { TokenGenerator } from '../core/port/TokenGenerator';
import { User } from '../core/model/User';
import { Token } from '../core/model/Token';
import jwt from 'jsonwebtoken';

export class JWTGenerator implements TokenGenerator {
    generate(user: User): Token {
        const token = jwt.sign(
            { user_id: user.id, user_role: user.roleId },
            process.env.JWT_SECRET || '',
            {
                expiresIn: process.env.JWT_EXPIRATION || '60'
            }
        );
        return {
            token,
            refreshToken: ''
        };
    }
}