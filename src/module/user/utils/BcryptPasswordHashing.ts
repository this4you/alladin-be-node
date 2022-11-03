import { PasswordHashing } from '../core/port/PasswordHashing';

export class BcryptPasswordHashing implements PasswordHashing {
    hash(password: string): string {
        console.log("PASSWORD WAS HASHED");

        return password;
    }

}