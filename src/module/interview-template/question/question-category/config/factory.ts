import {PostgresQuestionCategoryRepository} from "../repository/PostgresQuestionCategoryRepository";
import {GetAllQuestionCategoriesUseCase} from "../core/useCase/GetAllQuestionCategoriesUseCase";

export const getQuestionCategoryContext = () => {
    const questionCategory = new PostgresQuestionCategoryRepository();

    const getAllQuestionCategories = new GetAllQuestionCategoriesUseCase(questionCategory);
    return {
        getAllQuestionCategories,
    }
}