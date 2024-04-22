const express = require("express");
const { createJobController, updateJobController, JobDetailByIdController, getAllJobController } = require("../controller/job");
const { verifyTocken } = require("../middleware/verifyTocken");

const router = express.Router();

router.post("/create-job",verifyTocken, createJobController);
router.put("/update-job/:jobId",verifyTocken,updateJobController);
router.get("/job-details/:jobId",JobDetailByIdController);
router.get("/all-jobs",getAllJobController);

module.exports = router;