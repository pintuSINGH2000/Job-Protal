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
    res.status(200).send({ message: "Job created Successfully" });
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
    res.status(200).send({ message: "Job updated Successfully" });
  } catch (error) {
    next(error);
  }
};

// get job by id
const JobDetailByIdController = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    if (!jobId) {
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    return res.status(200).send(job);
  } catch (error) {
    next(error);
  }
};

// get All job

const getAllJobController = async (req, res, next) => {
  try {
    const query = req.query.search || "";
    const skill = req.query.skill;
    let filterSkill;
    let filterQuery = {};
    let jobList;
    if (!query && (!skill || skill.length == 0)) {
      jobList = await Job.find();
    } else {
      if (skill && skill.length > 0) {
        filterSkill = skill.split(",");
        const caseInsensitiveFilterSkill = filterSkill.map(
          (skill) => new RegExp(element, "i")
        );
        filterSkill = caseInsensitiveFilterSkill;
        filterQuery = { skills: { $in: filterSkill } };
      }
      jobList = await Job.find({
        title: { $regex: query, $options: "i" },
        ...filterQuery,
      });
    }
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
