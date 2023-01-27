import { Router } from 'express';
import { Request } from 'express';
import { CreateCompany } from './core/model/CreateCompany';
import { getCompanyContext } from './config/factory';
import { Company } from './core/model/Company';
import {tryExecute} from "../../../infrastructure/utils/tryExecute";

const companyRouter = Router();
const {createCompanyUseCase} = getCompanyContext();

companyRouter.post('/', async (req: Request<{}, Company, CreateCompany>, res, next) => {
    /*
    #swagger.tags = ['auth']
    #swagger.summary = 'Create company with user'
    #swagger.description = 'Returns company id and name'
    #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        description: 'Add company and user',
        schema: {
            name: 'Test company',
            user: {
                name: "TestUser",
                email: "test.user@mail.com",
                password: "TestPa$$word43",
                "companyRoleId": "companyRoleId"
            }
        }
     }
     #swagger.responses[200] = {
        description: 'Company successfully created.',
        schema: {id: 'uuid4', name: 'Test company'}
     }*/
    await tryExecute(next, async () => {
       const company = await createCompanyUseCase.execute({
           name: req.body.name,
           user: req.body.user
       });
       return res.send(company);
    });
});

export default companyRouter;
