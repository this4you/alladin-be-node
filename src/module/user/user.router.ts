import { Router } from 'express';

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.send("Get user Info")
});

userRouter.post("/auth", (req, res) => {
    res.send("Auth user")
});

export default userRouter;