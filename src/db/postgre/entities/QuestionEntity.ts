import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseEntity} from "@db/postgre/entities/BaseEntity";
import {QuestionCategoryEntity} from "@db/postgre/entities/QuestionCategoryEntity";

@Entity({name: 'Question'})
export class QuestionEntity extends BaseEntity {
    @Column()
    text: string;

    @Column({ nullable: false })
    questionCategoryId: string;

    @ManyToOne(() => QuestionCategoryEntity)
    @JoinColumn()
    questionCategory: QuestionCategoryEntity;
}