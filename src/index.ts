import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './module/user/user.router';
import { BaseException } from './lib/model/BaseException';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/user', userRouter);

app.use((err: BaseException, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).send(err.message);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:3000`);
});