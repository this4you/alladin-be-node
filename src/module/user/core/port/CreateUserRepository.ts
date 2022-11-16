import { CreateUser } from '../model/CreateUser';
import { User } from '../model/User';

export interface CreateUserRepository {
    createUser(user: CreateUser): Promise<Omit<User, 'password'>>;
    isUserExsists(email: string): Promise<boolean>
}