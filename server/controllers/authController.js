import asyncHandler from "express-async-handler";
import { User } from "../models";
import { generateToken } from "../utils";

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  // No user found
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  // Check if password is at least 8 characters
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters!");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});

/**
 * @desc    Authenticate user and get token
 * @route   POST /api/users/login
 * @access  Public
 */

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // No user found
  if (!user) {
    res.status(400);
    throw new Error("No user found!");
  }

  const token = generateToken(user._id);

  res.cookie("userToken", token, {
    expire: 30 * 24 * 60 * 60 * 60,
  });

  if (user && (await user.authenticate(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password!");
  }
});

/**
 * @desc    Logout User
 * @route   POST /api/users/
 * @access  Private
 */

const logout = (req, res) => {
  res.clearCookie("userToken");
  return res.status(200).json({
    message: "Signed Out!",
  });
};

export default { register, login, logout };
