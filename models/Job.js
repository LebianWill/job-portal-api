const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [100, "Description title cannot exceed characters"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true,
      enum: {
        values: ["On-site", "Remote", "Hybrid"],
        messsage: "Location must be On-site, Remote,or Hybrid",
      },
    },
    salary: {
      type:Number,
      required:true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps:true }
);

const Job = mongoose.model('Job',JobSchema);

module.exports = Job;