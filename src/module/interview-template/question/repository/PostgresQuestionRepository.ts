import {Between, MoreThan} from "typeorm";

import {QuestionRepository} from "@module/interview-template/question/core/port/QuestionRepository";
import {CreateQuestion} from "@module/interview-template/question/core/model/CreateQuestion";
import {UpdateQuestion} from "@module/interview-template/question/core/model/UpdateQuestion";
import {Question} from "@module/interview-template/question/core/model/Question";
import {PatchPosition} from "@module/interview-template/step/core/model/PatchPosition";

import questionRepository from "@db/postgre/repositories/questionRepository";

export class PostgresQuestionRepository implements QuestionRepository {
    async create(data: CreateQuestion): Promise<Question> {
        const lastPosition = await questionRepository.countBy( {stepCategoryId: data.stepCategoryId});

        const question = questionRepository.create({
            text: data.text,
            stepCategoryId: data.stepCategoryId,
            position: lastPosition + 1
        });

        await questionRepository.save(question);

        return {...question};
    }

    async isExists(text: string, stepCategoryId: string): Promise<boolean> {
        return await questionRepository.exist({
            where:{
                stepCategoryId: stepCategoryId,
                text: text
            }
        });
    }

    async update(data: UpdateQuestion): Promise<UpdateQuestion> {
        await questionRepository.update({id: data.id}, data)

        return {...data};
    }

    async getQuestion(id: string): Promise<Question> {
        return await questionRepository.findOneOrFail({where:{id: id}});
    }

    async reducePositionsAfter(stepCategoryId: string, position: number): Promise<void> {
        await questionRepository.decrement({
            stepCategoryId: stepCategoryId,
            position: MoreThan(position),
        }, "position", 1);
    }

    async delete(id: string): Promise<void> {
        await questionRepository.delete(id);
    }

    async increasePositionBetween(stepCategoryId: string, currentPosition: number, newPosition: number): Promise<void> {
        await questionRepository.increment({
            stepCategoryId: stepCategoryId,
            position: Between(newPosition, currentPosition),
        }, "position", 1);
    }

    async decreasePositionBetween(stepCategoryId: string, currentPosition: number, newPosition: number): Promise<void> {
        await questionRepository.decrement({
            stepCategoryId: stepCategoryId,
            position: Between(currentPosition, newPosition),
        }, "position", 1);
    }

    async patchPosition(patchData: PatchPosition): Promise<void> {
        await questionRepository.update(
            {id: patchData.id},
            {position: patchData.position}
        )
    }

}