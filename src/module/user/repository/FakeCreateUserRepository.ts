import { CreateUserRepository } from '../core/port/CreateUserRepository';
import { User } from '../core/model/User';

export class FakeCreateUserRepository implements CreateUserRepository {
    async createUser(user: User): Promise<void> {
        console.log('USER WAS CREATED', user);
    }

}