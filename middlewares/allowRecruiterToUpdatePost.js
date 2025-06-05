const Job = require("../models/Job");
const allowRecruiterToUpdatePost = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    console.log(jobId)
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });
    console.log(job.title)
    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: "Forbidden:You can only edit or delete your own job posts",
      });
    }
    req.job = job;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

module.exports = allowRecruiterToUpdatePost;
