import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/routes";

const app = express();

// ------------------ Load .env ------------------
dotenv.config(); // membaca file .env

const PORT = process.env.PORT; 
// -----------------------------------------------

// ------------------ Middleware ------------------
app.use(express.json());
// -----------------------------------------------

app.use(router);


// ----------- Jalankan Server --------------------
app.listen(PORT, () => {
    console.log(`Express API running on port: ${PORT}`);
});
// -----------------------------------------------
