import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseEntity} from "@db/postgre/entities/BaseEntity";
import {QuestionCategoryEntity} from "@db/postgre/entities/QuestionCategoryEntity";
import {StepEntity} from "@db/postgre/entities/StepEntity";


@Entity({name: 'StepCategory'})
export class StepCategoryEntity extends BaseEntity {
    @Column()
    stepId: string;

    @ManyToOne(() => StepEntity)
    @JoinColumn()
    step: StepEntity;

    @Column()
    questionCategoryId: string;

    @ManyToOne(() => QuestionCategoryEntity)
    @JoinColumn()
    questionCategory: QuestionCategoryEntity;

    @Column()
    position: number;
}