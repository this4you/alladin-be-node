import { Router, Request } from 'express';

import { tryExecute } from "../../../infrastructure/utils/tryExecute";
import { getCompanyContext } from './config/factory';
import { CreateCompany } from './core/model/CreateCompany';
import { Company } from './core/model/Company';

const companyRouter = Router();
const {createCompanyUseCase} = getCompanyContext();

companyRouter.post('/', async (req: Request<{}, Company, CreateCompany>, res, next) => {
    await tryExecute(next, async () => {
        const company = await createCompanyUseCase.execute(req.body);

        return res.send(company);
    });
});

export default companyRouter;
