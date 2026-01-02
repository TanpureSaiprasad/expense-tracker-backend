import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password : hashedPassword
  });

  res.status(201).json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id)
  });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid Email" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  // console.log("Password Match:", isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id)
  });
};


