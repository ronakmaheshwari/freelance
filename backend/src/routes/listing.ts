import express from "express"
import { jobApplicantModal, jobListingModal } from "../db.js";
import { authMiddleware } from "../middleware.js";

const listingRouter = express.Router()

listingRouter.get("/jobs",authMiddleware,async(req:any, res:any)=>{
    try{
        const filter = req.query.filter || ""

        const response = await jobListingModal.find({
            $or: [
                { title: { $regex: filter, $options: "i" } }, 
                { description: { $regex: filter, $options: "i" } }
            ]
        }).select("title description location salaryRange jobType");
        
        res.status(200).json({jobs:response})
    }catch(error){
        console.log(error   );
        return res.status(404).json({
            message:"Internal Error Occured"
        })
    }
})

listingRouter.post("/apply",authMiddleware,async(req:any, res:any)=>{
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

export {listingRouter}