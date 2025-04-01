import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { jobApplicantModal, jobListingModal, userModal } from "../db.js"
import { JWT_SECRET, saltrounds } from "../index.js"

const userRouter = express.Router()

userRouter.post("/signup",async(req:any,res:any)=>{
    try{
        const {fullName, email, password, bio} = req.body
        const ExistingUser = await userModal.findOne({email})
        if(ExistingUser){
            return res.status(404).json({
                message:"Email Already Exists"
            })
        }
        const hash = await bcrypt.hash(password, saltrounds)
        const response = await userModal.create({
            fullName,
            email,
            password:hash,
            bio
        })
        const id = response._id
        const token = jwt.sign({userId: id}, JWT_SECRET)
        return res.status(200).json({
            message:"User Successfully Added",
            token: token
        })
    }catch(error){
        console.log(error);
        return res.status(404).json({
            message:"Internal Error Occured"
        })
    }
})

userRouter.post("/signin",async(req:any,res:any)=>{
    try{
        const {email, password} = req.body
        const ExistingUser = await userModal.findOne({email})
        
        if(!ExistingUser){
            return res.status(404).json({
                message:"Email Already Exists"
            })
        }
        
        if (!ExistingUser.password) {
            return res.status(400).json({ message: "Password is missing for this user" });
        }

        const IsPasswordCorrect = await bcrypt.compare(password, ExistingUser.password)

        if(!IsPasswordCorrect){
            return  res.status(400).json({ message: "Password Provided Is Wrong" });
        }
        const id = ExistingUser._id

        const token = jwt.sign({userId: id}, JWT_SECRET)

        return res.status(200).json({
            token: token
        })
    }catch(error){
        console.log(error);
        return res.status(404).json({
            message:"Internal Error Occured"
        })
    }
})

userRouter.post("/apply",async(req:any, res:any)=>{
   try{
    const {jobId, resumeUrl} = req.body;
    const AlreadyApplied = await jobApplicantModal.findOne({ jobId: jobId, "users.userId": req.userId })

    if (AlreadyApplied) {
        return res.status(400).json({ message: "You have already applied for this job!" });
    }

    const application = await jobApplicantModal.findOneAndUpdate(
        { jobId: jobId }, 
        {
            $push: {
                users: {
                    userId: req.userId,
                    resume_url: resumeUrl,
                    status: "pending",
                    appliedAt: new Date()
                }
            }
        },
        { new: true, upsert: true } 
    );

    res.status(200).json({ message: "Application submitted successfully", application });
   }catch(error){
        console.log(error);
        return res.status(404).json({
            message:"Internal Error Occured"
        })
   }
})

userRouter.get("/applied",async(req:any, res:any)=>{
    try{
        const response = await jobApplicantModal.find({
            "users.userId": req.userId  
        }).populate("jobId");

        res.status(200).json({response})
    }catch(error){
        console.log(error);
        return res.status(404).json({
            message:"Internal Error Occured"
        })
    }
})

userRouter.get("/jobs",async(req:any, res:any)=>{
    try{
        const response = await jobListingModal.find().select("title description location salaryRange jobType");
        res.status(200).json({response})
    }catch(error){
        console.log(error);
        return res.status(404).json({
            message:"Internal Error Occured"
        })
    }
})

export {userRouter}