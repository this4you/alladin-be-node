import express, { Express } from 'express';
import dotenv from 'dotenv';
import companyRouter from './module/company/company.router';
import { connectToDb } from './db/postgre';
import userRouter from './module/user/user.router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json';
import cors from 'cors';
import { errorHandler } from './infrastructure/middleware/errorHandler';
import "reflect-metadata"
import interviewTemplateRouter from "./module/interview-template/interview-template.router";

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
