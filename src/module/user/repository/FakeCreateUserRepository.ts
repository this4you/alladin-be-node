import { CreateUserRepository } from '../core/port/CreateUserRepository';
import { User } from '../core/model/User';
import { CreateUser } from '../core/model/CreateUser';

export class FakeCreateUserRepository implements CreateUserRepository {
    async createUser(user: CreateUser): Promise<User> {
        console.log("User created");

        return {
            id: '',
            ...user
        }
    }

}