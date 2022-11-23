import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log('Got token', token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.status(404);
        throw new Error('User error');
      }
      req.user = user;
      next();
      return;
    } catch (error) {}
  }
  res.status(401);
  throw new Error('Not authorized');
});

export { protect };
