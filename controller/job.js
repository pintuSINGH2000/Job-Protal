const Job = require("../model/job");

// create job
const createJobController = async (req, res, next) => {
  try {
    const {
      companyName,
      logoUrl,
      jobPosition,
      salary,
      jobType,
      locationType,
      location,
      jobDescription,
      companyDescription,
      information,
      duration,
      skills,
    } = req.body;
    const userId = req.userId;

    if (
      !companyName ||
      !logoUrl ||
      !jobPosition ||
      !salary ||
      !jobType ||
      !locationType ||
      !location ||
      !jobDescription ||
      !companyDescription ||
      !information ||
      skills.length == 0 ||
      !duration
    ) {
      return res.status(400).send({ errorMessage: "Bad request" });
    }

    const job = new Job({
      companyName,
      logoUrl,
      jobPosition,
      salary,
      jobType,
      locationType,
      location,
      jobDescription,
      companyDescription,
      information,
      duration,
      skills,
      creater: userId,
    });
    await job.save();
    res.status(201).send({ job: job._id, message: "Job created Successfully" });
  } catch (error) {
    next(error);
  }
};

// update job
const updateJobController = async (req, res, next) => {
  const jobId = req.params.jobId;
  try {
    const {
      companyName,
      logoUrl,
      jobPosition,
      salary,
      jobType,
      locationType,
      location,
      jobDescription,
      companyDescription,
      information,
      duration,
      skills,
    } = req.body;
    const userId = req.userId;
    if (
      !companyName ||
      !logoUrl ||
      !jobPosition ||
      !salary ||
      !jobType ||
      !locationType ||
      !location ||
      !jobDescription ||
      !companyDescription ||
      !information ||
      !skills ||
      skills.length == 0 ||
      !duration ||
      !userId
    ) {
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    const job = await Job.findByIdAndUpdate(
      jobId,
      {
        companyName,
        logoUrl,
        jobPosition,
        salary,
        jobType,
        locationType,
        location,
        jobDescription,
        companyDescription,
        information,
        duration,
        skills,
        creater: userId,
      },
      { new: true }
    );
    if (!job) {
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    res.status(200).send({ job: jobId, message: "Job updated Successfully" });
  } catch (error) {
    next(error);
  }
};

// get job by id
const JobDetailByIdController = async (req, res, next) => {
  try {
    const { jobId, userId } = req.params;
    if (!jobId) {
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    let isEditable = false;
    if (userId === job.creater.toString()) {
      isEditable = true;
    }
    return res.status(200).send({ job, isEditable: isEditable });
  } catch (error) {
    next(error);
  }
};

// get All job

const getAllJobController = async (req, res, next) => {
  try {
    const title = req.query.title || "";
    const skill = req.query.skills || "";
    const userId = req.params.userId;

    let filterSkill;
    let filterQuery = {};
    let jobList;
    if (skill && skill.length > 0) {
      filterSkill = skill.split(",");
      const caseInsensitiveFilterSkill = filterSkill.map(
        (element) => new RegExp(element, "i")
      );
      filterSkill = { skills: { $in: caseInsensitiveFilterSkill } };
    }
    jobList = await Job.find({
      jobPosition: { $regex: title, $options: "i" },
      ...filterSkill,
    });
    jobList = jobList.map(job => ({
      ...job._doc,
      isEditable: job._doc.creater.toString() === userId,
    }));
    return res.status(200).send(jobList);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createJobController,
  updateJobController,
  JobDetailByIdController,
  getAllJobController,
};
