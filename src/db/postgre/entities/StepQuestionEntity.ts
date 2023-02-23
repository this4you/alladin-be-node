import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";

import {BaseEntity} from "@db/postgre/entities/BaseEntity";
import {QuestionEntity} from "@db/postgre/entities/QuestionEntity";
import {InterviewTemplateStepEntity} from "@db/postgre/entities/InterviewTemplateStepEntity";

@Entity({name: 'StepQuestion'})
export class StepQuestionEntity extends BaseEntity {

    @Column({ nullable: false })
    questionId: string;

    @ManyToOne(() => QuestionEntity)
    @JoinColumn()
    question: QuestionEntity;

    @Column({ nullable: false })
    stepId: string;

    @ManyToOne(() => InterviewTemplateStepEntity)
    @JoinColumn()
    step: InterviewTemplateStepEntity;
}