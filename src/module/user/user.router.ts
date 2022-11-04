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

userRouter.post("/create", async (req, res,next) => {
    try {
        await createUserUseCase.execute({
            email: '',
            password: '',
            name: '',
            companyRoleId: '',
            roleId: ''
        });

        res.send("User created")

    } catch (e) {
        next(e);
    }
});

export default userRouter;
