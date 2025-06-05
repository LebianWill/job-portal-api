const Job = require("../models/Job");

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;
    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      recruiter: req.user._id,
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiter", "username email");
    res.status(200).json({ count: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fecth Jobs" });
  }
};

// Get a job by id
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "recruiter",
      "username email"
    );
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to fecth job" });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "title",
      "description",
      "company",
      "location",
      "salary",
    ];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates" });
    }
    const job = req.job;

    updates.forEach((update) => (job[update] = req.body[update]));
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to update job" });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const job = req.job; //Set in middleware
    await job.remove();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
};
