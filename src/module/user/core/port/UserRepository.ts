import { User } from '../model/User';

export interface UserRepository {
    getUser(email: string): Promise<User | null>
}