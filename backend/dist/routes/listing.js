import express from "express";
import { jobListingModal } from "../db.js";
const listingRouter = express.Router();
listingRouter.get("/jobs", async (req, res) => {
    try {
        const response = await jobListingModal.find().select("title description location salaryRange jobType");
        res.status(200).json({ response });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({
            message: "Internal Error Occured"
        });
    }
});
export { listingRouter };
