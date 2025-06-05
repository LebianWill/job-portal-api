const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
// Register
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try { 
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new User
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(201).json({ user, token });  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid Credentials" });
    // Compare if the user has the correct password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });
    // New user without the password
    const loggedUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    // Sign token
    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res
      .status(200)
      .json({ message: "Logged in Sucessfully", user: loggedUser ,token});
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, error: "Internal Server Error" });
  }
};
