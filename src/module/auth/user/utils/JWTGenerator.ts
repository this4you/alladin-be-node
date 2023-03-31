import jwt from 'jsonwebtoken';

import { User } from '../core/model/User';
import { Token } from '../core/model/Token';
import { TokenUser } from '../core/model/TokenUser';
import { TokenGenerator } from '../core/port/TokenGenerator';
import { JWT_SECRET } from "secret";

export class JWTGenerator implements TokenGenerator {
    generate(user: User): Token {
        const payload: TokenUser = {
            userId: user.id,
            userRole: user.role,
            companyId: user.companyId,
        }
        const token = jwt.sign(
            payload,
            JWT_SECRET || '',
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