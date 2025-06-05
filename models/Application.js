const mongoose = require("mongoose");
const ApplicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    coverLetter: {
      type: String,
      required: [true, "Cover Letter is required"],
    },
    status: {
      type: String,
      required: [true, "Application status is required"],
      trim: true,
      enum: {
        values: ["pending", "rejected", "reviewed"],
        messsage: "Application status must be pending,rejected, or reviewed",
      },
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
