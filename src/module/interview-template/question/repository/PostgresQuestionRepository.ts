import {Between, MoreThan} from "typeorm";

import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";
import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {UpdateQuestion} from "@module/interview-template/question/core/model/UpdateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";

import questionRepository from "@db/postgre/repositories/questionRepository";

export class PostgresQuestionRepository implements QuestionRepository {
    async create(data: CreateQuestion): Promise<Question> {
        const stepCategoryTableSize = await questionRepository.countBy( {stepCategoryId: data.stepCategoryId});

        const question = questionRepository.create({
            text: data.text,
            stepCategoryId: data.stepCategoryId,
            position: stepCategoryTableSize+1
        });

        await questionRepository.save(question);

        return {...question};
    }

    async isExists(data: CreateQuestion): Promise<boolean> {
        return !!await questionRepository.findOneBy( {
            stepCategoryId: data.stepCategoryId,
            text: data.text
        });
    }

    async update(data: UpdateQuestion): Promise<UpdateQuestion> {
        await questionRepository.update({id: data.id}, data)

        return {...data};
    }

    async getQuestion(id: string): Promise<Question> {
        return await questionRepository.findOneOrFail({where:{id: id}});
    }

    async delete(data: Question): Promise<void> {
        await questionRepository.decrement({
            stepCategoryId: data.stepCategoryId,
            position: MoreThan(data.position),
        }, "position", 1);
        await questionRepository.delete(data.id);
    }

    async patchPosition(patchData: PatchPosition, questionData: Question): Promise<void> {
        if (questionData.position > patchData.position)
            await questionRepository.increment({
                stepCategoryId: questionData.stepCategoryId,
                position: Between(patchData.position, questionData.position),
            }, "position", 1);
        if (questionData.position < patchData.position)
            await questionRepository.decrement({
                stepCategoryId: questionData.stepCategoryId,
                position: Between(questionData.position, patchData.position),
            }, "position", 1);

        await questionRepository.update(
            {id: patchData.id},
            {position: patchData.position}
        )
    }

}