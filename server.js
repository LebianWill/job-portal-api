const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')
const jobRoutes = require('./routes/jobRoute')
const app = express();

// Environment variables
dotenv.config();
// Middlewares
app.use(express.json());
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/jobs',jobRoutes)
// Mongo Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Connected Sucessfully"))
  .catch((err) => console.log(err));
// Routes
app.get("/", (req, res) => {
  res.status(200).json({ welcome: "Job Portal API" });
});

// PORTS
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
