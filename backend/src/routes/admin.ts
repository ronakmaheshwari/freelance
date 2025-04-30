import express from "express"
import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"
import bcrypt from "bcryptjs";
import { adminModal, companyModal, jobApplicantModal, jobListingModal, userModal } from "../db.js"
import { JWT_SECRET, saltrounds } from "../index.js"
import { adminMiddleware, authMiddleware } from "../middleware.js"
import { Resend } from "resend";

const adminRouter = express.Router()
const resend = new Resend(process.env.Resend_Key);

adminRouter.post("/signup", async (req: any, res: any) => {
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

        const token = jwt.sign(
            { adminId: creatorId, companyId: company._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(201).json({
            message: "Admin and company have been created",
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

adminRouter.post("/signin", async (req:any, res:any) => {
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
  
      const InCompany = await companyModal.findOne({admins: admin._id})
      if(!InCompany){
        return res.status(401).json({
            message:"You are not from Company Admins"
        })
      }

      const token = jwt.sign(
        { adminId: admin._id, companyId: InCompany._id},
        JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      return res.status(200).json({
        message: "Sign-in successful",
        token,
        admin: {
          fullName: admin.fullName,
          email: admin.email,
          _id: admin._id,
        }
      });
  
    } catch (error) {
      console.error("Sign-in error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });


adminRouter.post("/addadmin", adminMiddleware, async (req: any, res: any) => {
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

        const updatedCompany = await companyModal.findByIdAndUpdate(
            companyId,
            { $addToSet: { admins: newAdmin._id } }, 
            { new: true }
        ).populate("admins", "-password -__v");

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

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const VALID_JOB_TYPES = [
    "full-time", "part-time", "internship"
  ];
  
  adminRouter.post("/create", adminMiddleware, async (req: any, res: any) => {
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
  
      } catch (error) {
          console.error("Job creation error:", error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
  });
  

adminRouter.get("/", adminMiddleware, async (req: any, res: any) => {
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

        const jobListings = await jobListingModal.find({ companyId }).populate("companyId","name").populate("creatorId","fullName");

        return res.status(200).json({
            message: "All company job listings fetched successfully",
            jobListings
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

adminRouter.get("/job", adminMiddleware, async (req: any, res: any) => {
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

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


adminRouter.get("/admins", adminMiddleware, async (req: any, res: any) => {
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

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

adminRouter.get("/application", adminMiddleware, async (req: any, res: any) => {
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
});

type stats = "accepted" | "pending" | "rejected";

interface Check {
  jobId: string;
  userId: string;
  status: stats;
}

adminRouter.post("/selection", adminMiddleware, async (req: any, res: any) => {
  try {
    const { jobId, userId, status }: Check = req.body;

    if (!jobId || !userId || !status) {
      return res.status(400).json({ message: "Missing jobId, userId, or status" });
    }

    const updated = await jobApplicantModal.findOneAndUpdate(
      { jobId, "users.userId": userId },
      { $set: { "users.$.status": status } },
      { new: true }
    ).populate("users.userId", "fullName");

    if (!updated) {
      return res.status(404).json({ message: "Job or user not found" });
    }

    const updatedUser = updated.users.find((u: any) => u.userId._id.toString() === userId);

    return res.status(200).json({
      message: `User status updated to ${status}`,
      updatedUser,
    });

  } catch (error) {
    console.error("Error in /selection:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

adminRouter.post("/userdetail", adminMiddleware, async (req: any, res: any) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const user = await userModal.findById(userId).select("email");
      if (!user) {
        return res.status(404).json({ message: "Invalid User ID" });
      }
      
      return res.status(200).json({ email: user.email });
    } catch (error) {
      console.error("Error in /userdetail:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

const ronak = (fullName: string, position: string) =>`
  <div style="font-family: Arial,t sans-serif; color: #333; background-color: #f4f4f4; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <h2 style="color: #4CAF50;">🎉 Congratulations, ${fullName}!</h2>
      <p style="font-size: 16px; line-height: 1.6;">
        We’re excited to let you know that you’ve been <strong>selected</strong> for the role of <strong>${position}</strong> at <strong>Hirely</strong>.
      </p>
      <p style="font-size: 16px; line-height: 1.6;">
        Please click the button below to visit your dashboard and proceed with the next steps.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://hirely.10xdevs.me" style="background-color: #4CAF50; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
          View Offer
        </a>
      </div>
      <p style="font-size: 14px; color: #888;">
        If you have any questions, feel free to reply to this email.<br/>
        Welcome aboard! 🚀
      </p>
      <hr style="margin-top: 30px;" />
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        Sent with ❤️ by Hirely
      </p>
    </div>
  </div>
`;

adminRouter.post("/email",adminMiddleware,async (req:any, res:any) => {
  const { email, fullName } = req.body;
  try {
    const html = ronak(fullName, "Your Position"); 
    await resend.emails.send({
      from: "onboarding@hire.10xdevs.me",
      to: email,
      subject: "You're Hired!",
      html
    });
    return res.status(200).json({ message: "Email sent" });
  } catch (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ message: "Failed to send email", error: error });
  }
});

export {adminRouter}