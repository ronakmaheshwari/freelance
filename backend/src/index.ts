import express from "express"
import morgan from "morgan"
import jwt from "jsonwebtoken"
import cors from "cors"
import mongoose from "mongoose" 
import bcrypt from "bcrypt"
import { router } from "./routes/index.js"

const app = express();
const port = process.env.PORT || 3000;
export const JWT_SECRET = "123456"
export const saltrounds = 10 

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/api/v1",router)

app.listen(port,()=>{
    console.log(`Server Running On http://localhost:${port}`)
})
