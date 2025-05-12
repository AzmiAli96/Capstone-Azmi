import express, { NextFunction, Request, Response } from 'express';
import { createUser, deleteUserById, getAllUser, getUserById, useUser } from '../service/user';
import jwt from "jsonwebtoken";

const router = express.Router();

interface userData {
    id: string;
    name: string;
    alamat: string;
    no_hp: string;
    role: string;
}

interface ValidationRequest extends Request {
    userData?: userData;
}

export const accessValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validationRequest = req as ValidationRequest;
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Token diperlukan" });
    }

    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET!;

    try {
        const jwtDecode = jwt.verify(token, secret);
        if (typeof jwtDecode !== "string") {
            validationRequest.userData = jwtDecode as userData;
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};


router.post("/register", async (req: Request, res: Response) => {
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
router.post("/login", async (req: Request, res: Response) => {
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

router.get("/", accessValidation, async (req: Request, res: Response) => {
    try {
        const user = await getAllUser();
        
        res.send(user);
    } catch (error: any) {
        res.status(400).send(error.message);
    }

});

router.get("/:id", accessValidation, async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        const user = await getUserById(itemId);

        res.send(user);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

// Delete Data
router.delete("/:id", async (req, res) => {
    try {
        const itemId = req.params.id;

        await deleteUserById(parseInt(itemId));

        res.send("data success delete")
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;