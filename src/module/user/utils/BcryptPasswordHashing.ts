import { PasswordHashing } from '../core/port/PasswordHashing';
import bcrypt from 'bcrypt';

//infrastructure
export class BcryptPasswordHashing implements PasswordHashing {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);

       // const result = await bcrypt.compare(password, hash);
    }

}