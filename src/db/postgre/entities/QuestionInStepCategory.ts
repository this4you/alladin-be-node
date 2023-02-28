import {Column, Entity, ManyToOne} from "typeorm";
import {BaseEntity} from "@db/postgre/entities/BaseEntity";
import {QuestionEntity} from "@db/postgre/entities/QuestionEntity";
import {StepCategoryEntity} from "@db/postgre/entities/StepCategory";

@Entity({name: 'QuestionInStepCategory'})
export class QuestionInStepCategoryEntity extends BaseEntity {

    @Column()
    stepCategoryId: string
    @ManyToOne(() => StepCategoryEntity)
    stepCategory: StepCategoryEntity;

    @Column()
    questionId: string
    @ManyToOne(() => QuestionEntity)
    question: QuestionEntity;

    @Column()
    position: number;
}