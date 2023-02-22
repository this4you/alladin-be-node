import {Column, Entity} from "typeorm";
import {BaseEntity} from "@db/postgre/entities/BaseEntity";

@Entity({name: 'Question'})
export class QuestionEntity extends BaseEntity {
    @Column()
    text: string
    @Column()
    questionCategoryId: string
}