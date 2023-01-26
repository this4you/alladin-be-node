import "reflect-metadata"
import cors from 'cors';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json';
import { connectToDb } from './db/postgre';
import { errorHandler } from './infrastructure/middleware/errorHandler';

import userRouter from './module/auth/user/user.router';
import companyRouter from './module/auth/company/company.router';
import interviewTemplateRouter from "./module/interview-template/template/interview-template.router";
import interviewTemplateStepRouter from "./module/interview-template/step/interview-template-step.router";
import questionCategoryRouter from "./module/question/question-category/question-category.router";
import questionCategoryInStepRouter from "./module/question/question-category-in-step/question-category-in-step.router";

const configs = async () => {
    dotenv.config();
    await connectToDb();
}

const settingExpressApp = (): Express => {
    const app: Express = express();

    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use('/company', companyRouter);
    app.use('/user', userRouter);
    app.use('/interview-template', interviewTemplateRouter);
    app.use('/step', interviewTemplateStepRouter);
    app.use('/question-category', questionCategoryRouter)
    app.use('/question-category-in-step', questionCategoryInStepRouter)

    app.get('/', (req, res) => {
        res.send('SERVER WORKS!')
    });

    app.use(errorHandler);

    return app;
}

const run = (app: Express) => {
    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}

(async () => {
    console.log('start server...');
    await configs();
    console.log('server configured');
    run(settingExpressApp());
})()
