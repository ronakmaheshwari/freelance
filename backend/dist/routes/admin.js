import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { adminModal, companyModal, jobApplicantModal, jobListingModal } from "../db.js";
import { JWT_SECRET, saltrounds } from "../index.js";
import { adminMiddleware } from "../middleware.js";
const adminRouter = express.Router();
adminRouter.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password, bio, name, description, web_url } = req.body;
        const existingUser = await adminModal.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const existingCompany = await companyModal.findOne({ name });
        if (existingCompany) {
            return res.status(409).json({ message: "Company name already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        const user = await adminModal.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        });
        const creatorId = user._id;
        const company = await companyModal.create({
            createdBy: creatorId,
            name,
            description,
            web_url,
            admins: []
        });
        company.admins.push(creatorId);
        await company.save();
        const token = jwt.sign({ adminId: creatorId, companyId: company._id }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(201).json({
            message: "Admin and company have been created",
            token
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
adminRouter.post("/signin", async (req, res) => {
    try {
        const { email, password, companyId } = req.body;
        if (!email || !password || !companyId) {
            return res.status(400).json({ message: "Invalid Details Provided" });
        }
        const admin = await adminModal.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        const InCompany = await companyModal.findOne({ admins: admin._id });
        if (!InCompany) {
            return res.status(401).json({
                message: "You are not from Company Admins"
            });
        }
        const token = jwt.sign({ adminId: admin._id, companyId: InCompany._id }, JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            message: "Sign-in successful",
            token,
            admin: {
                fullName: admin.fullName,
                email: admin.email,
                _id: admin._id,
            }
        });
    }
    catch (error) {
        console.error("Sign-in error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
adminRouter.post("/addadmin", adminMiddleware, async (req, res) => {
    try {
        const adminId = req.adminId;
        const companyId = req.companyId;
        const { fullName, email, password, bio } = req.body;
        const existingUser = await adminModal.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        const newAdmin = await adminModal.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        });
        const updatedCompany = await companyModal.findByIdAndUpdate(companyId, { $addToSet: { admins: newAdmin._id } }, { new: true }).populate("admins", "-password -__v");
        if (!updatedCompany) {
            return res.status(404).json({ message: "Company not found" });
        }
        return res.status(201).json({
            message: "New admin added successfully",
            admin: {
                _id: newAdmin._id,
                fullName: newAdmin.fullName,
                email: newAdmin.email,
                bio: newAdmin.bio
            },
            company: updatedCompany
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
const VALID_JOB_TYPES = [
    "full-time", "part-time", "internship"
];
adminRouter.post("/create", adminMiddleware, async (req, res) => {
    try {
        const { title, description, location, salaryRange, jobType } = req.body;
        const creatorId = req.adminId;
        const companyId = req.companyId;
        if (!VALID_JOB_TYPES.includes(jobType)) {
            return res.status(400).json({
                message: `Invalid job type. Valid types are: ${VALID_JOB_TYPES.join(", ")}`
            });
        }
        const adminExists = await adminModal.findById(creatorId);
        if (!adminExists) {
            return res.status(404).json({ message: "Admin not found!" });
        }
        const company = await companyModal.findOne({ _id: companyId, admins: creatorId });
        if (!company) {
            return res.status(403).json({ message: "Unauthorized: Admin is not part of this company!" });
        }
        const newJob = await jobListingModal.create({
            companyId,
            creatorId,
            title,
            description,
            location,
            salaryRange,
            jobType,
            jobApplicants: []
        });
        return res.status(201).json({
            message: "Job listing created successfully!",
            job: newJob
        });
    }
    catch (error) {
        console.error("Job creation error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
adminRouter.get("/", adminMiddleware, async (req, res) => {
    try {
        const creatorId = req.adminId;
        const companyId = req.companyId;
        const adminExists = await adminModal.findById(creatorId);
        if (!adminExists) {
            return res.status(404).json({ message: "Admin not found!" });
        }
        const companyExists = await companyModal.findOne({
            _id: companyId,
            admins: creatorId
        });
        if (!companyExists) {
            return res.status(403).json({ message: "Unauthorized: Admin is not part of this company!" });
        }
        const jobListings = await jobListingModal.find({ companyId }).populate("companyId", "name").populate("creatorId", "fullName");
        return res.status(200).json({
            message: "All company job listings fetched successfully",
            jobListings
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
adminRouter.get("/job", adminMiddleware, async (req, res) => {
    try {
        const creatorId = req.adminId;
        const companyId = req.companyId;
        const adminExists = await adminModal.findById(creatorId);
        if (!adminExists) {
            return res.status(404).json({ message: "Admin not found!" });
        }
        const companyExists = await companyModal.findOne({ _id: companyId, admins: creatorId });
        if (!companyExists) {
            return res.status(403).json({ message: "Unauthorized: Admin is not part of this company!" });
        }
        const jobListings = await jobListingModal.find({ companyId, creatorId });
        return res.status(200).json({
            message: "Job listings retrieved successfully",
            jobListings
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
adminRouter.get("/admins", adminMiddleware, async (req, res) => {
    try {
        const companyId = req.companyId;
        const company = await companyModal
            .findOne({ _id: companyId }).populate("admins", "fullName");
        if (!company) {
            return res.status(404).json({ message: "Company not found!" });
        }
        return res.status(200).json({
            message: "Admins retrieved successfully",
            admins: company.admins
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
adminRouter.get("/application", adminMiddleware, async (req, res) => {
    try {
        const jobId = req.query.jobId?.toString();
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required" });
        }
        const response = await jobApplicantModal
            .findOne({ jobId })
            .select("users")
            .populate("users.userId", "fullName");
        return res.status(200).json({
            message: "Applications retrieved successfully",
            application: response,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
export { adminRouter };
