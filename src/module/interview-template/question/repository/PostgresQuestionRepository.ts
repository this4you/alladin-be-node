import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";
import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import questionRepository from "@db/postgre/repositories/questionRepository";

export class PostgresQuestionRepository implements QuestionRepository {
    async create(data: CreateQuestion): Promise<Question> {
        const question = questionRepository.create(data);

        await questionRepository.save(question);

        return {...question};
    }

    async getQuestionByText(text: string): Promise<Question | null> {
        return await questionRepository.findOneBy({text: text});
    }

    async getQuestions(id: string): Promise<Question[]> {
        return await questionRepository.findBy({id: id});
    }

}