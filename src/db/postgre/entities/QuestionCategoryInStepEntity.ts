import {Entity, JoinColumn, ManyToOne} from "typeorm";

import {BaseEntity} from "./BaseEntity";
import {InterviewTemplateStepEntity} from "./InterviewTemplateStepEntity";
import {QuestionCategoryEntity} from "./QuestionCategoryEntity";

@Entity({name: 'QuestionCategoryInStep'})
export class QuestionCategoryInStepEntity extends BaseEntity {
    @ManyToOne(_ => QuestionCategoryEntity)
    @JoinColumn()
    questionCategory: QuestionCategoryEntity

    @ManyToOne(_ => InterviewTemplateStepEntity)
    @JoinColumn()
    interviewTemplateStep: InterviewTemplateStepEntity
}