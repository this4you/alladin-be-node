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

    async getQuestionByText(data: Pick<Question, "text">): Promise<Question | null> {
        return await questionRepository.findOneBy(data);
    }

    async getQuestions(data: Pick<Question, "id">): Promise<Question[]> {
        return await questionRepository.findBy(data);
    }

}