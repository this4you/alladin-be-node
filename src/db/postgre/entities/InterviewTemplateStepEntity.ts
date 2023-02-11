import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm'

import {BaseEntity} from './BaseEntity';
import {InterviewTemplateEntity} from "./InterviewTemplateEntity";

@Entity({name: 'InterviewTemplateSteps'})
export class InterviewTemplateStepEntity extends BaseEntity {
    @Column()
    name: string;

    @ManyToOne(type => InterviewTemplateEntity)
    @JoinColumn()
    interviewTemplate: InterviewTemplateEntity;

    @Column()
    position: number;
}