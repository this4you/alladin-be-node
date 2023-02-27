import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm'

import {BaseEntity} from './BaseEntity';
import {InterviewTemplateEntity} from "./InterviewTemplateEntity";

@Entity({name: 'Step'})
export class StepEntity extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: false })
    interviewTemplateId: string;

    @ManyToOne(() => InterviewTemplateEntity)
    @JoinColumn()
    interviewTemplate: InterviewTemplateEntity;

    @Column()
    position: number;
}