import { Router } from 'express';
import { getUserContext } from './config/factory';

const userRouter = Router();

const { createUserUseCase} = getUserContext();

userRouter.get("/", (req, res) => {
    res.send("Get user Info")
});

userRouter.post("/auth", (req, res) => {
    res.send("Auth user")
});

userRouter.post("/create", async (req, res) => {
    await createUserUseCase.execute({
        email: 'me_vlad@ukr.net',
        password: '',
        name: '',
        companyRoleId: '',
        roleId: ''
    });

    res.send("User created")
});

export default userRouter;
