import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCategories)                        // Public
  .post(protect, adminOnly, createCategory); // Admin

router.route('/:id')
  .get(getCategoryById)                           // Public
  .put(protect, adminOnly, updateCategory)        // Admin
  .delete(protect, adminOnly, deleteCategory);    // Admin

export default router;
