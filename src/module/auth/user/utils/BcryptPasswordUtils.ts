import bcrypt from 'bcrypt';

import { PasswordHashing } from '../core/port/PasswordHashing';
import { PasswordValidator } from '../core/port/PasswordValidator';

//infrastructure
export class BcryptPasswordUtils implements PasswordHashing, PasswordValidator {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

}