export interface PasswordHashing {
    hash(password: string): string;
}