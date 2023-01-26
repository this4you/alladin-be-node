import { CreateUserRepository } from '../core/port/CreateUserRepository';
import { User } from '../core/model/User';
import { CreateUser } from '../core/model/CreateUser';
import userRepository from '../../../../db/postgre/repositories/userRepository';
import companyRepository from '../../../../db/postgre/repositories/companyRepository';
import { NotFoundException } from '../../../../lib/model/app-exception/NotFoundException';

export class PostgreCreateUserRepository implements CreateUserRepository {
    async createUser(user: CreateUser): Promise<Omit<User, 'password'>> {
        const company = await companyRepository.findOneBy({ id: user.companyId });

        if (company === null) {
            throw new NotFoundException('Company not found');
        }

        const userEntity = await userRepository.create({
            name: user.name,
            email: user.email,
            password: user.password,
            company: company,
            role: user.role
        });

        await userRepository.save(userEntity);

        console.log('User created', userEntity);

        return {
            id: userEntity.id,
            name: userEntity.name,
            email: userEntity.email,
            companyId: userEntity.company.id,
            role: userEntity.role
        };
    }

    async isUserExsists(email: string): Promise<boolean> {
        const user = await userRepository.findOneBy({ email: email });
        return !!user;
    }

}