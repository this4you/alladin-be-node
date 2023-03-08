import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm'

import {BaseEntity} from "@db/postgre/entities/BaseEntity";
import {InterviewTemplateEntity} from "@db/postgre/entities/InterviewTemplateEntity";

@Entity({name: 'TemplateStep'})
export class TemplateStepEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    position: number;

    @Column({ nullable: false })
    interviewTemplateId: string;

    @ManyToOne(() => InterviewTemplateEntity,  {onDelete:'CASCADE'})
    @JoinColumn()
    interviewTemplate: InterviewTemplateEntity;
}