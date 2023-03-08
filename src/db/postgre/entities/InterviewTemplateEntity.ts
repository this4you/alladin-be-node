import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm'

import {BaseEntity} from '@db/postgre/entities/BaseEntity';
import {CompanyEntity} from "@db/postgre/entities/CompanyEntity";

@Entity({name: 'InterviewTemplate'})
export class InterviewTemplateEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    companyId: string;

    @ManyToOne(() => CompanyEntity,  {onDelete:'CASCADE'})
    @JoinColumn()
    company: CompanyEntity;
}