const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values:["candidate", "recruiter", "admin"],
        messsage: "User role must be candidate,recruiter, or admin",
      },
      default: "candidate",
      required: true,
    },
  },{timestamps:true}
);

const User = mongoose.model('User',UserSchema);

module.exports = User;