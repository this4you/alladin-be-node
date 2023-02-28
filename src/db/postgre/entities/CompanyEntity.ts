import { Column, Entity } from 'typeorm'

import { BaseEntity } from './BaseEntity';

@Entity({name: 'Company'})
export class CompanyEntity extends BaseEntity {
    @Column()
    name: string
}