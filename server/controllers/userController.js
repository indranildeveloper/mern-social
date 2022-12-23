import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import formidable from "formidable";
import Jimp from "jimp";
import { extend } from "lodash";
import { User } from "../models";
import { generateToken, generateUrl } from "../utils";

/**
 * @desc    List all users
 * @route   GET /api/users
 * @access  Private
 */

const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select(
    "name email about photo createdAt updatedAt"
  );
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
    // Bug fix
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
  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400);
      throw new Error("Photo can to be uploaded!");
    }

    let user = await User.findById(req.profile._id);

    user = extend(user, fields);
    const fileUploadPath = files.photo.filepath;

    const imgType = files.photo.mimetype.split("/")[1];
    const photoId = uuidv4();
    const uploadedFilePath = `${process
      .cwd()
      .replaceAll("\\", "/")}/server/uploads/profile/${photoId}.${imgType}`;

    Jimp.read(fileUploadPath, (photoErr, profilePhoto) => {
      if (photoErr) {
        console.log(photoErr);
        res.status(400);
        throw new Error("Photo can not be uploaded!");
      }

      // TODO: delete the extra photos
      profilePhoto.resize(256, 256).write(uploadedFilePath);
    });

    /**
     * @todo: Bug fix
     * Add the mimetype and add it to the db and do not use the server url
     * Do not use the originalFilename
     */

    user.photo = generateUrl(`profile/${photoId}.${imgType}`);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.about = req.body.about || user.about;
      user.photo = req.body.photo || user.photo;

      if (req.body.password) {
        user.password = req.body.password || user.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        about: updatedUser.about,
        photo: updatedUser.photo,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found!");
    }
  });
});

/**
 * @desc    Return Profile Photo
 * @route   DELETE /api/users/:userId/photo
 * @access  Public
 */

// eslint-disable-next-line consistent-return
const profilePhoto = (req, res, next) => {
  if (req.profile.photo) {
    return res.status(200).json({
      url: req.profile.photo,
    });
  }
  next();
};

/**
 * @desc    Return Default Profile Photo
 * @route   DELETE /api/users/defaultPhoto
 * @access  Public
 */

const defaultPhoto = (req, res) => {
  return res.status(200).json({
    url: `${req.headers.host}/profile/images/profile-pic.png`,
  });
};

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
  profilePhoto,
  defaultPhoto,
};
