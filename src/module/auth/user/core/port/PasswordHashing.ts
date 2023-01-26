export interface PasswordHashing {
    hash(password: string): Promise<string>;
}