import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { UserRole } from '@lib/model/UserRole';

import { CompanyEntity } from '@db/postgre/entities/CompanyEntity';
import { BaseEntity } from '@db/postgre/entities/BaseEntity';

@Entity({name: 'User'})
export class UserEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @ManyToOne(() => CompanyEntity)
    @JoinColumn()
    company: CompanyEntity;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;
}