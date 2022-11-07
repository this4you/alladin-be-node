import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { BaseException } from './lib/model/BaseException';
import companyRouter from './module/company/company.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/company', companyRouter);

app.get('/', (req, res) => {
    res.send('SERVER WORKS!')
});

app.use((err: BaseException, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 400).send(err.message);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});