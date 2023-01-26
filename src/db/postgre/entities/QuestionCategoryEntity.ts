import {Column, Entity} from "typeorm";
import {BaseEntity} from "./BaseEntity";

@Entity({name: 'QuestionCategory'})
export class QuestionCategoryEntity extends BaseEntity {
    @Column()
    name: string
}