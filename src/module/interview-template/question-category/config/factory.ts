import {PostgresQuestionCategoryRepository} from "src/module/interview-template/question-category/repository/PostgresQuestionCategoryRepository";
import {GetAllQuestionCategoriesUseCase} from "src/module/interview-template/question-category/core/useCase/GetAllQuestionCategoriesUseCase";

export const getQuestionCategoryContext = () => {
    const questionCategory = new PostgresQuestionCategoryRepository();

    const getAllQuestionCategories = new GetAllQuestionCategoriesUseCase(questionCategory);
    return {
        getAllQuestionCategories,
    }
}