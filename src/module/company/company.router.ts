import { Router } from 'express';
import { Request } from 'express';
import { CreateCompany } from './core/model/CreateCompany';
import { getCompanyContext } from './config/factory';
import { Company } from './core/model/Company';

const companyRouter = Router();
const {createCompanyUseCase} = getCompanyContext();

companyRouter.post('/', async (req: Request<{}, Company, CreateCompany>, res, next) => {
    try {
       const company = await createCompanyUseCase.execute(req.body);
       return res.send(company);
    } catch (e) {
        next(e);
    }
});

export default companyRouter;
