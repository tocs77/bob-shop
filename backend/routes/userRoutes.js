import express from 'express';

import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/login').post(authUser);
router.route('/').post(registerUser).put(protect, updateUserProfile);
router.route('/profile').get(protect, getUserProfile);

export default router;
