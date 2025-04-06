import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb+srv://ronak:<mongoPassword>/freelance")

const userSchema = new Schema({
    fullName: {type:String, required:true},
    email: {type:String,unique:true, required:true},
    password:{type:String,required:true},
    bio: {type:String,required:true}
})

const adminSchema = new Schema({
    fullName: {type:String, required:true},
    email: {type:String,unique:true, required:true},
    password:{type:String,required:true},
    bio: {type:String,required:true},
})

const companySchema = new Schema({
    createdBy:{type: mongoose.Schema.Types.ObjectId, ref: "admin", required: true, unique: true},
    name: {type:String, required:true, unique:true},
    description:{type:String, required:true},
    web_url: {type:String},
    admins: [{type: mongoose.Schema.Types.ObjectId, ref: "admin"}]
})

const joblistingSchema = new Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "company", required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "admin", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      required: true
    },
    jobApplicants: [{ type: Schema.Types.ObjectId, ref: "user" }]
});

const jobapplicationSchema = new Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "joblisting", required: true },
    users: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        resume_url: { type: String, required: true },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending"
        },
        appliedAt: { type: Date, default: Date.now }
      }
    ]
});

const userModal = mongoose.model("user",userSchema)
const adminModal = mongoose.model("admin", adminSchema)
const companyModal = mongoose.model("company", companySchema)
const jobListingModal = mongoose.model("joblisting",joblistingSchema)
const jobApplicantModal = mongoose.model("jobapplication",jobapplicationSchema)

export {userModal,companyModal,adminModal,jobListingModal,jobApplicantModal}