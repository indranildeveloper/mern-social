import asyncHandler from "express-async-handler";
import { User } from "../models";
import { generateToken } from "../utils";

/**
 * @desc    List all users
 * @route   GET /api/users
 * @access  Private
 */

const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("name email createdAt updatedAt");
  res.status(200).json(users);
});

/**
 * @desc    Get user by id
 * @route   GET /api/users/:userId
 * @access  Private
 */

const getUserById = asyncHandler(async (req, res, next, userId) => {
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }
  req.profile = user;
  next();
});

/**
 * @desc    Read user details
 * @route   GET /api/users/:userId
 * @access  Private
 */

const readUserProfile = asyncHandler(async (req, res) => {
  req.profile.password = undefined;
  return res.status(200).json(req.profile);
});

/**
 * @desc    Update user details
 * @route   PUT /api/users/:userId
 * @access  Private
 */

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.profile._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

/**
 * @desc    Delete user Profile
 * @route   DELETE /api/users/:userId
 * @access  Private
 */

const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = req.profile;

  if (user) {
    const deletedUser = await user.remove();
    deletedUser.password = undefined;
    res.status(200).json(deletedUser);
  } else {
    res.status(404);
    throw new Error("User can not be deleted!");
  }
});

export default {
  listUsers,
  getUserById,
  readUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
