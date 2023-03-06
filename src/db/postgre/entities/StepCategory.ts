import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseEntity} from "@db/postgre/entities/BaseEntity";
import {QuestionCategoryEntity} from "@db/postgre/entities/QuestionCategoryEntity";
import {TemplateStepEntity} from "@db/postgre/entities/TemplateStepEntity";


@Entity({name: 'StepCategory'})
export class StepCategoryEntity extends BaseEntity {

    @Column()
    position: number;

    @Column()
    questionCategoryId: string;

    @ManyToOne(() => QuestionCategoryEntity)
    @JoinColumn()
    questionCategory: QuestionCategoryEntity;

    @Column()
    stepId: string;

    @ManyToOne(() => TemplateStepEntity)
    @JoinColumn()
    step: TemplateStepEntity;
}