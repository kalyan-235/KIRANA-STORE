import express from 'express';
import {
  getProducts,
  getProductCounts,
  getProductById,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)                        // Public
  .post(protect, adminOnly, createProduct); // Admin

router.get('/counts', getProductCounts); // Public

router.route('/:id')
  .get(getProductById)                          // Public
  .put(protect, adminOnly, updateProduct)       // Admin
  .delete(protect, adminOnly, deleteProduct);   // Admin

router.get('/:id/related', getRelatedProducts); // Public

export default router;
