import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import authRouter from "./routers/auth.route.js";
import { connectCloudinary } from "./services/cloudinary.config.js";
import productRouter from "./routers/product.route.js";

// dotenv configration
dotenv.config();

// app initialize
const app = express();

// request handle by frontend 
app.use(cors());

// port initialize
const PORT = process.env.PORT || 8000;

// connect db 
connectDb();

// connect cloudinary 
connectCloudinary();

// json data parse 
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// api end points for user authentication
app.use("/api/auth", authRouter);

// api end points for product model
app.use("/api/product", productRouter)

// server started 
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
})