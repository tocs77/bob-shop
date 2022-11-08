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

export { authUser, getUserProfile, registerUser };
