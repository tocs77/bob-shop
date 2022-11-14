import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error(`Email or password incorrect.`);
  }
  res.cookie('jwt', generateToken(user._id), { maxAge: 900000, httpOnly: true });
  res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
});

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({ name, email, password });
  if (user) {
    res.cookie('jwt', generateToken(user._id), { maxAge: 900000, httpOnly: true });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
    return;
  }

  throw new Error('Invalid user data');
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  //  const user = await User.findById({ email });
  const user = req.user;
  res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.cookie('jwt', generateToken(updatedUser._id), { maxAge: 900000, httpOnly: true });
    res
      .status(200)
      .json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin });
    return;
  }
  res.status(404);
  throw new Error('User not found');
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
