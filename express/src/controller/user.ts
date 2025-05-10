import express, { Request, Response } from 'express';
import { createUser, useUser } from '../service/user';

const router = express.Router();

router.post("/register", async(req:Request, res:Response) => {
    try {
        const item = req.body;
        const user = await createUser(item);

        res.send({
            data: user,
            message: "Register Success",
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

// jangan lupa ubah ke use kalau udah ada middleware
router.post("/login", async(req:Request, res:Response)=> {
    try {
        const item = req.body;
        const user = await useUser(item);

        res.send({
            data: user,
            message: "Login Success",
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
})

export default router;