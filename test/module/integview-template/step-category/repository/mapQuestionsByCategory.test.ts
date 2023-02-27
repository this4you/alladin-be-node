import {createMock} from "ts-auto-mock";
import {QuestionInStepCategoryEntity} from "@db/postgre/entities/QuestionInStepCategory";
import {QuestionEntity} from "@db/postgre/entities/QuestionEntity";
import {StepCategoryEntity} from "@db/postgre/entities/StepCategory";
import {QuestionCategoryEntity} from "@db/postgre/entities/QuestionCategoryEntity";

import {StepFrame} from "@module/interview-template/step-category/core/model/StepFrame";
import {mapQuestionsByCategory} from "@module/interview-template/step-category/repository/mapQuestionsByCategory";


describe('Tests', () => {
    it('Map value', () => {
        //Given
        const stepId = '1';
        const enterData: QuestionInStepCategoryEntity[] = [
            createMock<QuestionInStepCategoryEntity>({
                stepCategoryId: '1',
                stepCategory: createMock<StepCategoryEntity>({
                    id: '1',
                    stepId: stepId,
                    questionCategoryId: '1',
                    questionCategory: createMock<QuestionCategoryEntity>({
                        id: '1',
                        name: 'CategoryName1'
                    }),
                    position: 1
                }),
                questionId: '1',
                question: createMock<QuestionEntity>({
                    id: '1',
                    text: 'Text question1',
                }),
                position: 1,
            }),
            createMock<QuestionInStepCategoryEntity>({
                stepCategoryId: '2',
                stepCategory: createMock<StepCategoryEntity>({
                    id: '2',
                    stepId: stepId,
                    questionCategoryId: '2',
                    questionCategory: createMock<QuestionCategoryEntity>({
                        id: '2',
                        name: 'CategoryName2'
                    }),
                    position: 2
                }),
                questionId: '2',
                question: createMock<QuestionEntity>({
                    id: '2',
                    text: 'Text question2',
                }),
                position: 1,
            }),
            createMock<QuestionInStepCategoryEntity>({
                stepCategoryId: '3',
                stepCategory: createMock<StepCategoryEntity>({
                    id: '3',
                    stepId: stepId,
                    questionCategoryId: '1',
                    questionCategory: createMock<QuestionCategoryEntity>({
                        id: '1',
                        name: 'CategoryName1'
                    }),
                    position: 3
                }),
                questionId: '3',
                question: createMock<QuestionEntity>({
                    id: '3',
                    text: 'Text question3',
                }),
                position: 2,
            }),
            createMock<QuestionInStepCategoryEntity>({
                stepCategoryId: '4',
                stepCategory: createMock<StepCategoryEntity>({
                    id: '4',
                    stepId: stepId,
                    questionCategoryId: '3',
                    questionCategory: createMock<QuestionCategoryEntity>({
                        id: '3',
                        name: 'CategoryName3'
                    }),
                    position: 3
                }),
                questionId: '4',
                question: createMock<QuestionEntity>({
                    id: '4',
                    text: 'Text question4',
                }),
                position: 1,
            }),
        ];
        const expected:StepFrame[] = [
            {
                stepCategoryId: '1',
                categoryName: 'CategoryName1',
                position: 1,
                questions: [
                    {
                        id: '1',
                        text: 'Text question1',
                        position: 1
                    },
                    {
                        id: '3',
                        text: 'Text question3',
                        position: 2
                    },
                ]
            },
            {
                stepCategoryId: '2',
                categoryName: 'CategoryName2',
                position: 2,
                questions: [
                    {
                        id: '2',
                        text: 'Text question2',
                        position: 1
                    },
                ]
            },
            {
                stepCategoryId: '4',
                categoryName: 'CategoryName3',
                position: 3,
                questions: [
                    {
                        id: '4',
                        text: 'Text question4',
                        position: 1
                    },
                ]
            },
        ]

        //When
        const actual = mapQuestionsByCategory(enterData);

        //Then
        expect(actual).toEqual(expected);
    });
});