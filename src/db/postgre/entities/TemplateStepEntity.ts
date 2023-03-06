import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm'

import {BaseEntity} from './BaseEntity';
import {InterviewTemplateEntity} from "./InterviewTemplateEntity";

@Entity({name: 'TemplateStep'})
export class TemplateStepEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    position: number;

    @Column({ nullable: false })
    interviewTemplateId: string;

    @ManyToOne(() => InterviewTemplateEntity)
    @JoinColumn()
    interviewTemplate: InterviewTemplateEntity;
}