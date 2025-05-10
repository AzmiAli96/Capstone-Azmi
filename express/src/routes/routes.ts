import express from "express";
import wilayahController from '../controller/wilayah';
import userController from "../controller/user";
import orderController from "../controller/order"
import statusController from "../controller/status"

const router = express.Router();


// Test Route 
router.get("/", (req, res) => {
    res.send("Berhasil Bro");
});

// Router untuk wilayah 
router.use('/wilayah', wilayahController);

// Router untuk user 
router.use('/user', userController);

// Router untuk pengiriman/order
router.use('/order', orderController)

// Router untuk pengiriman/order
router.use('/status', statusController)



export default router;