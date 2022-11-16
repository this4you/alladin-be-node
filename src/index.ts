import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { BaseException } from './lib/model/BaseException';
import companyRouter from './module/company/company.router';
import { connectToDb } from './db/mongo/index';



const configs = async () => {
    dotenv.config();
    await connectToDb();
}

const settingExpressApp =  (): Express => {
    const app: Express = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/company', companyRouter);

    app.get('/', (req, res) => {
        res.send('SERVER WORKS!')
    });

    app.use((err: BaseException, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode || 400).send(err.message);
    });

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
