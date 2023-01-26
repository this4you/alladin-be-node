import {PostgresQuestionCategoryRepository} from "../repository/PostgresQuestionCategoryRepository";
import {GetAllQuestionCategoryUseCase} from "../core/useCase/GetAllQuestionCategoryUseCase";

export const getQuestionCategoryContext = () => {
    const questionCategory = new PostgresQuestionCategoryRepository();

    const getAllQuestionCategory = new GetAllQuestionCategoryUseCase(questionCategory);
    return {
        getAllQuestionCategory,
    }
}