import { User } from '../model/User';

export interface CreateUserRepository {
    createUser(user: User): Promise<void>
}