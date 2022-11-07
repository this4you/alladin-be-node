import { Router } from 'express';
import { Request } from 'express';
import { CreateCompany } from './core/model/CreateCompany';
import { getCompanyContext } from './config/factory';

const companyRouter = Router();
const {createCompanyUseCase} = getCompanyContext();

companyRouter.post('/', async (req: Request<{}, string, CreateCompany>, res, next) => {
    try {
       const companyId = await createCompanyUseCase.execute(req.body);
       return res.send(companyId);
    } catch (e) {
        next(e);
    }
});

export default companyRouter;
