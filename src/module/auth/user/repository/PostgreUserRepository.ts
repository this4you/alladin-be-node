import userRepository from '@db/postgre/repositories/userRepository';
import { UserEntity } from '@db/postgre/entities/UserEntity';

import { User } from '../core/model/User';
import { UserRepository } from '../core/port/UserRepository';

export class PostgreUserRepository implements UserRepository {
    async getUserByEmail(email: string): Promise<User | null> {
        const user = await userRepository.findOne({
            where: {
                email: email
            },
            relations: {
                company: true
            }
        });

        return this.mapUserModel(user);
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await userRepository.findOne({
            where: {
                id: id
            },
            relations: {
                company: true
            }
        });

        return this.mapUserModel(user);
    }

    private mapUserModel(user: UserEntity | null): User | null {
        return user == null ? null : {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            companyId: user.company.id,
            role: user.role
        }
    }
}