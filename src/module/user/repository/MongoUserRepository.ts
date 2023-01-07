import { UserRepository } from '../core/port/UserRepository';
import { User } from '../core/model/User';
import { UserEntity } from '../../../db/mongo/schemas/User';
import { UserRole } from '../../../lib/model/UserRole';
import { ICompany } from '../../../db/mongo/schemas/Company';

export class MongoUserRepository implements UserRepository {
    async getUserByEmail(email: string): Promise<User | null> {
        const user = await UserEntity.findOne({ email: email }).populate<{ company: ICompany }>('company').exec();

        return this.mapUserModel(user);
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await UserEntity.findById(id).populate<{ company: ICompany }>('company').exec();

        return this.mapUserModel(user);
    }

    private mapUserModel(user: any): User | null {
        return user == null ? null : {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            companyId: user?.company._id,
            role: user.role as UserRole,
        }
    }
}