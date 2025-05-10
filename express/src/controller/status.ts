import express, { Request, Response } from 'express';
import { getAllstatus } from '../service/status';

const router = express.Router();

// Menampilkan Data
router.get("/", async (req: Request, res: Response) => {
    try {
        const status = await getAllstatus();
        
        res.send(status);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});


export default router;