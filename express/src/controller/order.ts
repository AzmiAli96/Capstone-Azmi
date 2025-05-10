import express, { Request, Response } from 'express';
import { createOrder, deleteOrderById, getAllOrder, getOrderById, updateOrderById } from '../service/order';
import { orderData } from '../types/order';

const router = express.Router();

// Menampilkan Data
router.get("/", async (req: Request, res: Response) => {
    try {
        const order = await getAllOrder();
        
        res.send(order);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const itemId = parseInt(req.params.id);
        const order = await getOrderById(itemId);

        res.send(order);
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

// Create Data
router.post("/", async(req:Request, res:Response) => {
    try {
        const body = req.body;

        const item: orderData = {
            berat: parseInt(body.berat),
            koli: parseInt(body.koli),
            pembayaran: body.pembayaran,
            total: parseFloat(body.total),
            ket: body.ket,
            image: body.image,
            tanggal: body.tanggal,
            id_user: parseInt(body.id_user),
            id_wilayah: parseInt(body.id_wilayah)
          };
        
        const order = await createOrder(item);

        res.send({
            data: order,
            message: "Create data success",
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body;

        if (
            !(
                body.berat &&
                body.koli &&
                body.pembayaran &&
                body.ket &&
                body.id_user &&
                body.id_wilayah
            )
        ) {
            return res.status(400).send("Some fields are missing");
        }

        const item: orderData = {
            berat: parseInt(body.berat),
            koli: parseInt(body.koli),
            pembayaran: body.pembayaran,
            total: parseFloat(body.total),
            ket: body.ket,
            image: body.image,
            tanggal: body.tanggal,
            id_user: parseInt(body.id_user),
            id_wilayah: parseInt(body.id_wilayah)
        };

        const updatedOrder = await updateOrderById(Number(id), item);

        res.send({
            data: updatedOrder,
            message: "Update data success"
        });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});



router.delete("/:id", async (req, res) => {
    try {
        const itemId = req.params.id;

        await deleteOrderById(parseInt(itemId));

        res.send("data success delete")
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

export default router;