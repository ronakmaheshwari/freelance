import express from "express"
import morgan from "morgan"
import jwt from "jsonwebtoken"
import cors from "cors"
import mongoose from "mongoose" 
import bcrypt from "bcrypt"
import { router } from "./routes/index.js"
import dotenv from "dotenv"

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
export const JWT_SECRET = "123456"
export const saltrounds = 10 

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/api/v1",router)

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
});