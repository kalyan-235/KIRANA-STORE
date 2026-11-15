import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateAddress,
  getAllUsers,
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login',    loginUser);

// Private routes
router.get('/profile',  protect, getUserProfile);
router.put('/profile',  protect, updateUserProfile);
router.put('/address',  protect, updateAddress);

// Admin routes
router.get('/', protect, adminOnly, getAllUsers);

export default router;
