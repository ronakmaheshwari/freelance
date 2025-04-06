import express from "express"
import { userRouter } from "./user.js"
import { adminRouter } from "./admin.js"
import { listingRouter } from "./listing.js"

const router = express.Router()

router.use("/user",userRouter)
router.use("/admin",adminRouter)
router.use("/jobs",listingRouter)

export {router}