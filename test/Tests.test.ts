import { StepQuestionEntity } from '@db/postgre/entities/StepQuestionEntity';
import { QuestionsInStep } from '@module/interview-template/question/core/model/QuestionsInStep';
import { createMock } from 'ts-auto-mock';
import { QuestionCategoryEntity } from '@db/postgre/entities/QuestionCategoryEntity';
import { QuestionEntity } from '@db/postgre/entities/QuestionEntity';

function mapQuestionsByCategory(stepQuestions: StepQuestionEntity[]): QuestionsInStep[] {
    return stepQuestions.reduce<QuestionsInStep[]>((previousValue: QuestionsInStep[], item: StepQuestionEntity) => {
        let categoryItem = previousValue.find(it => it.categoryId === item.question.questionCategoryId);

        if (!categoryItem) {
            categoryItem = {
                stepId: item.stepId,
                categoryId: item.question.questionCategoryId,
                categoryName: item.question.questionCategory.name,
                questions: []
            };
            previousValue.push(categoryItem);
        }

        categoryItem.questions.push({
            id: item.questionId,
            text: item.question.text
        });

        return previousValue;

    }, [] as QuestionsInStep[]);
}

describe('Tests', () => {
    it('Map value', () => {
        //Given
        const stepId = '1';
        const enterData: StepQuestionEntity[] = [
            createMock<StepQuestionEntity>({
                stepId: stepId,
                questionId: '1',
                question: createMock<QuestionEntity>({
                    questionCategory: createMock<QuestionCategoryEntity>({
                        id: '1',
                        name: 'Category1',
                    }),
                    questionCategoryId: '1',
                    text: "Text question1"
                }),
            }),
            createMock<StepQuestionEntity>({
                stepId: stepId,
                questionId: '2',
                question: createMock<QuestionEntity>({
                    questionCategory: createMock<QuestionCategoryEntity>({
                        id: '2',
                        name: 'Category2',
                    }),
                    questionCategoryId: '2',
                    text: "Text question2"
                }),
            }),
            createMock<StepQuestionEntity>({
                stepId: stepId,
                questionId: '3',
                question: createMock<QuestionEntity>({
                    questionCategory: createMock<QuestionCategoryEntity>({
                        id: '1',
                        name: 'Category1',
                    }),
                    questionCategoryId: '1',
                    text: "Text question3"
                }),
            }),
            createMock<StepQuestionEntity>({
                stepId: stepId,
                questionId: '4',
                question: createMock<QuestionEntity>({
                    questionCategory: createMock<QuestionCategoryEntity>({
                        id: '3',
                        name: 'Category3',
                    }),
                    questionCategoryId: '3',
                    text: "Text question4"
                }),
            })
        ];
        const expected:QuestionsInStep[] = [
            {
              stepId: stepId,
              categoryId: '1',
              categoryName: 'Category1',
              questions: [
                  {
                      id: '1',
                      text: 'Text question1'
                  },
                  {
                      id: '3',
                      text: 'Text question3'
                  },
              ]
            },
            {
                stepId: stepId,
                categoryId: '2',
                categoryName: 'Category2',
                questions: [
                    {
                        id: '2',
                        text: 'Text question2'
                    }
                ]
            },
            {
                stepId: stepId,
                categoryId: '3',
                categoryName: 'Category3',
                questions: [
                    {
                        id: '4',
                        text: 'Text question4'
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