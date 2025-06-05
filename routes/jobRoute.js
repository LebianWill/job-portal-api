const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const allowRecruiterToUpdatePost = require("../middlewares/allowRecruiterToUpdatePost");

const jobController = require("../controllers/jobController");

// Recruiter can create job
router.post("/", auth, authorize("recruiter"), jobController.createJob);
router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);
router.patch(
  "/:id",
  auth,
  authorize("recruiter"),
  allowRecruiterToUpdatePost,
  jobController.updateJob
);

module.exports = router;
