import questionRepository from "@db/postgre/repositories/questionRepository";

import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";
import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import {UpdateQuestion} from "@module/interview-template/question/core/model/UpdateQuestion";

export class PostgresQuestionRepository implements QuestionRepository {
    async create(data: CreateQuestion): Promise<Question> {
        const question = questionRepository.create({
            text: data.text,
            questionCategoryId: data.questionCategoryId
        })

        await questionRepository.save(question);

        return {...question};
    }

    async getByQuestionCategoryId(questionCategoryId: string): Promise<Question[]> {
        return await questionRepository.findBy({questionCategoryId: questionCategoryId});
    }

    async update(data: UpdateQuestion): Promise<UpdateQuestion> {
        await questionRepository.update({id: data.id}, data)
        return {...data}
    }

    async delete(id: string): Promise<void> {
        await questionRepository.delete(id);
    }

    async getQuestionByText(text: string): Promise<Question | null> {
        return questionRepository.findOneBy({text: text});
    }

}