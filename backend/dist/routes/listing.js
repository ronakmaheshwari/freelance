import express from "express";
import { jobApplicantModal, jobListingModal } from "../db.js";
import { authMiddleware } from "../middleware.js";
import mongoose from "mongoose";
const listingRouter = express.Router();
listingRouter.get("/", authMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter?.toString() || "";
        const isValidObjectId = mongoose.Types.ObjectId.isValid(filter);
        const jobs = await jobListingModal.find({
            $or: [
                ...(isValidObjectId ? [{ _id: new mongoose.Types.ObjectId(filter) }] : []),
                { title: { $regex: filter, $options: "i" } },
                { description: { $regex: filter, $options: "i" } }
            ]
        }).select("title description location salaryRange jobType companyId creatorId").populate("companyId", "name").populate("creatorId", "fullName");
        return res.status(200).json({
            message: "Jobs fetched successfully.",
            jobs
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
});
listingRouter.post("/apply", authMiddleware, async (req, res) => {
    try {
        const { jobId, resumeUrl } = req.body;
        const userId = req.userId;
        const alreadyApplied = await jobApplicantModal.findOne({
            jobId,
            "users.userId": userId
        });
        if (alreadyApplied) {
            return res.status(400).json({ message: "You have already applied for this job!" });
        }
        const application = await jobApplicantModal.findOneAndUpdate({ jobId }, {
            $push: {
                users: {
                    userId,
                    resume_url: resumeUrl,
                    status: "pending",
                    appliedAt: new Date()
                }
            }
        }, { new: true, upsert: true });
        return res.status(200).json({
            message: "Application submitted successfully",
            application
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
});
export { listingRouter };
