import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm'

import {BaseEntity} from './BaseEntity';
import {CompanyEntity} from "./CompanyEntity";

@Entity({name: 'InterviewTemplate'})
export class InterviewTemplateEntity extends BaseEntity {
    @Column()
    name: string

    @Column()
    companyId: string;

    @ManyToOne(() => CompanyEntity)
    @JoinColumn()
    company: CompanyEntity;
}