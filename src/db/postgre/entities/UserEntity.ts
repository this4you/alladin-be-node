import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { CompanyEntity } from './CompanyEntity';
import { BaseEntity } from './BaseEntity';
import { UserRole } from '../../../lib/model/UserRole';

@Entity({name: 'Users'})
export class UserEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @ManyToOne(type => CompanyEntity)
    @JoinColumn()
    company: CompanyEntity;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;
}