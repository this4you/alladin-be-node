import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm'

import {BaseEntity} from './BaseEntity';
import {CompanyEntity} from "./CompanyEntity";

@Entity({name: 'InterviewTemplates'})
export class InterviewTemplateEntity extends BaseEntity {
    @Column()
    name: string

    @ManyToOne(type => CompanyEntity)
    @JoinColumn()
    company: CompanyEntity;
}