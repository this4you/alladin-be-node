export interface PasswordValidator {
    compare(password: string, hash: string): Promise<boolean>
}