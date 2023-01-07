import { Column, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity';

@Entity({name: 'Companies'})
export class CompanyEntity extends BaseEntity {
    @Column()
    name: string
}