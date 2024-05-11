const express = require("express");
const { createJobController, updateJobController, JobDetailByIdController, getAllJobController } = require("../controller/job");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

router.post("/create-job",verifyToken, createJobController);
router.put("/update-job/:jobId",verifyToken,updateJobController);
router.get("/job-details/:jobId/:userId",JobDetailByIdController);
router.get("/all-jobs/:userId?",getAllJobController);

module.exports = router;