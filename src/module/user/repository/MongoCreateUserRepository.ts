import { CreateUserRepository } from '../core/port/CreateUserRepository';
import { User } from '../core/model/User';
import { CreateUser } from '../core/model/CreateUser';
import { UserEntity } from '../../../db/mongo/schemas/User';

export class MongoCreateUserRepository implements CreateUserRepository {
    async createUser(user: CreateUser): Promise<Omit<User, 'password'>> {

        const userEntity = new UserEntity({
            name: user.name,
            email:  user.email,
            password: user.password,
            company: user.companyId,
            role: user.role
        });

        await userEntity.save();

        console.log("User created", userEntity);

        return {
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email,
            companyRoleId: user.companyRoleId,
            companyId: user.companyId,
            roleId: user.role
        };
    }

}