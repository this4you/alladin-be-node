import { User } from '../model/User';

export interface UserRepository {
    getUserByEmail(email: string): Promise<User | null>

    getUserById(id: string): Promise<User | null>
}