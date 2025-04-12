import express from "express";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt"
import bcrypt from "bcryptjs";
import { jobApplicantModal, userModal } from "../db.js";
import { JWT_SECRET, saltrounds } from "../index.js";
import { authMiddleware } from "../middleware.js";
const userRouter = express.Router();
userRouter.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password, bio } = req.body;
        const existingUser = await userModal.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        const newUser = await userModal.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        });
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(201).json({
            message: "User successfully registered",
            token
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
userRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModal.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found. Please sign up first."
            });
        }
        if (!existingUser.password) {
            return res.status(400).json({ message: "Password is missing for this user." });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password." });
        }
        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            message: "Login successful.",
            token
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
});
userRouter.get("/applied", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const applications = await jobApplicantModal
            .find({ "users.userId": userId }).populate("jobId", "title");
        return res.status(200).json({
            message: "Fetched applied jobs successfully.",
            applications,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
});
userRouter.get("/getdetail", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        console.log(userId);
        const detail = await userModal.findById(userId).select("-password");
        if (!detail) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({ detail });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
});
userRouter.patch("/update", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const { fullName, email, password, bio } = req.body;
        let updateData = { fullName, email, bio };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltrounds);
            updateData.password = hashedPassword;
        }
        const updatedUser = await userModal.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({
            message: "User updated successfully.",
            user: updatedUser
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
});
export { userRouter };
