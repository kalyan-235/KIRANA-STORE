import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Private routes (logged-in users)
router.post('/',        protect, createOrder);
router.get('/my',       protect, getMyOrders);
router.get('/:id',      protect, getOrderById);
router.put('/:id/pay',  protect, updateOrderToPaid);
router.put('/:id/cancel', protect, cancelOrder);

// Admin routes
router.get('/',             protect, adminOnly, getAllOrders);
router.put('/:id/status',   protect, adminOnly, updateOrderStatus);

export default router;
