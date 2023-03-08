import {Column, Entity, ManyToOne} from "typeorm";

import {BaseEntity} from "@db/postgre/entities/BaseEntity";
import {StepCategoryEntity} from "@db/postgre/entities/StepCategory";

@Entity({name: 'Question'})
export class QuestionEntity extends BaseEntity {

    @Column()
    text: string;

    @Column()
    position: number;

    @Column()
    stepCategoryId: string;
    @ManyToOne(() => StepCategoryEntity,  {onDelete:'CASCADE'})
    stepCategory: StepCategoryEntity;
}