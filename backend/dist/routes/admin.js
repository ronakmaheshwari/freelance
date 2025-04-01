import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { adminModal, companyModal, jobListingModal } from "../db.js";
import { JWT_SECRET, saltrounds } from "../index.js";
const adminRouter = express.Router();
adminRouter.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password, bio, companyId } = req.body;
        const existingUser = await adminModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        let assignedCompanyId = companyId;
        if (companyId) {
            const companyExists = await companyModal.findById(companyId);
            if (!companyExists) {
                return res.status(404).json({ message: "Company not found!" });
            }
            assignedCompanyId = companyId;
        }
        else {
            const newCompany = await companyModal.create({
                createdBy: null,
                name: `${fullName}'s Company`,
                description: "Default description",
                web_url: "",
                admins: []
            });
            assignedCompanyId = newCompany._id;
        }
        const newAdmin = await adminModal.create({
            fullName,
            email,
            password: hashedPassword,
            bio,
            companyId: assignedCompanyId
        });
        await companyModal.findByIdAndUpdate(assignedCompanyId, {
            $push: { admins: newAdmin._id },
            createdBy: companyId ? undefined : newAdmin._id
        });
        const token = jwt.sign({ adminId: newAdmin._id, companyId: assignedCompanyId }, JWT_SECRET);
        return res.status(201).json({
            message: "Admin signed up successfully!",
            token: token,
            admin: newAdmin
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
        const ExistingUser = await adminModal.findOne({ email });
        if (!ExistingUser) {
            return res.status(404).json({
                message: "Admin Not Found"
            });
        }
        if (!ExistingUser.password) {
            return res.status(400).json({
                message: "Password Doesn't Exist"
            });
        }
        const IsPasswordCorrect = await bcrypt.compare(password, ExistingUser.password);
        if (!IsPasswordCorrect) {
            return res.status(400).json({
                message: "Wrong Password Provided"
            });
        }
        const adminExistsInCompany = await companyModal.findOne({ admins: ExistingUser._id });
        if (!adminExistsInCompany) {
            return res.status(400).json({ message: "Admin is not linked to any company!" });
        }
        if (companyId && companyId !== ExistingUser.companyId.toString()) {
            return res.status(400).json({ message: "Invalid Company ID!" });
        }
        const token = jwt.sign({ adminId: ExistingUser._id, companyId: ExistingUser.companyId }, JWT_SECRET);
        return res.status(200).json({
            token
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
adminRouter.post("/create", async (req, res) => {
    try {
        const { title, description, location, salaryRange, jobType, companyId } = req.body;
        const creatorId = req.adminId;
        const adminExists = await adminModal.findById(creatorId);
        if (!adminExists) {
            return res.status(404).json({ message: "Admin not found!" });
        }
        const companyExists = await companyModal.findOne({ _id: companyId, admins: creatorId });
        if (!companyExists) {
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
        res.status(201).json({
            message: "Job listing created successfully!",
            job: newJob
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
adminRouter.get("/", async (req, res) => {
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
        const response = await jobListingModal.find({ companyId });
        return res.status(200).json({
            response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
adminRouter.get("/adminjob", async (req, res) => {
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
        const response = await jobListingModal.find({ companyId, creatorId });
        return res.status(200).json({
            response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
adminRouter.get("/admins", async (req, res) => {
    try {
        const creatorId = req.adminId;
        const companyId = req.companyId;
        const company = await companyModal.findOne({ _id: companyId }).populate("admins");
        if (!company) {
            return res.status(404).json({ message: "Company not found!" });
        }
        res.status(200).json({
            message: "Admins retrieved successfully",
            admins: company.admins
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
export { adminRouter };
