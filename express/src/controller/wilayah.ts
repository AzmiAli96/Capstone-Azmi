// layer untuk handle request dan response

import express, { Request, Response } from 'express';
import { createWilayah, deleteWilayahById, getAllWilayah, getWilayahById, updateWilayahById } from '../service/wilayah'; // mengambil prismaclient dari folder db

const router = express.Router();

// Menampilkan Data
router.get("/", async (req: Request, res: Response) => {
    try {
        const wilayah = await getAllWilayah();
        
        res.send(wilayah);
    } catch (error: any) {
        res.status(400).send(error.message);
    }

});

router.get("/:id", async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        const wilayah = await getWilayahById(itemId);

        res.send(wilayah);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});


// Create Data
router.post("/", async(req:Request, res:Response) => {
    try {
        const item = req.body;
        const wilayah = await createWilayah(item);

        res.send({
            data: wilayah,
            message: "Create data success",
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

// update Data
router.put("/:id", async(req:Request, res:Response) => {
    try {
        const itemId = parseInt(req.params.id);
        const item = req.body;

        if (!
            (item.provinsi &&
                item.wilayah &&
                item.harga
            )
        ) {
            return res.status(400).send("Some Field are missing");
        }

        const wilayah = await updateWilayahById(itemId, item);

        res.send({
            data: wilayah,
            message: "Update data success",
        });
    
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

// Delete Data
router.delete("/:id", async (req, res) => {
    try {
        const itemId = req.params.id;

        await deleteWilayahById(parseInt(itemId));

        res.send("data success delete")
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;