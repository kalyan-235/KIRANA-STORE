import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_CHARGE = 40;

// @desc  Create new order
// @route POST /api/orders
// @access Private
export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error('No order items provided');
  }
  const addressFields = ['fullName', 'phone', 'street', 'city', 'state', 'pincode'];
  if (
    !shippingAddress ||
    addressFields.some((field) => typeof shippingAddress[field] !== 'string' || !shippingAddress[field].trim()) ||
    !['COD', 'UPI', 'Card', 'NetBanking'].includes(paymentMethod || 'COD')
  ) {
    res.status(400);
    throw new Error('Provide a shipping address and valid payment method');
  }

  for (const item of items) {
    if (!item || !mongoose.isValidObjectId(item.product) || !Number.isInteger(item.qty) || item.qty < 1) {
      res.status(400);
      throw new Error('Each order item must include a valid product ID and positive integer quantity');
    }
  }

  const products = await Product.find({
    _id: { $in: items.map((item) => item.product) },
    isActive: true,
  });
  const productById = new Map(products.map((product) => [product._id.toString(), product]));

  const orderItems = items.map((item) => {
    const product = productById.get(item.product.toString());
    if (!product) {
      res.status(400);
      throw new Error('An order item references an unavailable product');
    }
    if (!product.inStock) {
      res.status(400);
      throw new Error(`${product.name} is out of stock`);
    }

    const variant = item.variantLabel
      ? product.variants.find((entry) => entry.label === item.variantLabel)
      : null;
    if (item.variantLabel && !variant) {
      res.status(400);
      throw new Error(`The selected variant is unavailable for ${product.name}`);
    }

    return {
      product: product._id,
      name: product.name,
      img: product.img,
      weight: variant?.label || product.weight,
      price: variant?.price ?? product.price,
      original: variant?.original ?? product.original,
      qty: item.qty,
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.original * item.qty, 0);
  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = subtotal - totalPrice;
  const deliveryCharge = totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const totalAmount = totalPrice + deliveryCharge;

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    shippingAddress,
    paymentMethod: paymentMethod || 'COD',
    subtotal,
    discount,
    deliveryCharge,
    totalAmount,
  });

  res.status(201).json({ success: true, data: order });
});

// @desc  Get logged-in user's orders
// @route GET /api/orders/my
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate('items.product', 'name img');

  res.json({ success: true, count: orders.length, data: orders });
});

// @desc  Get order by ID
// @route GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid order ID');
  }
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email phone')
    .populate('items.product', 'name img');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Allow only owner or admin
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to view this order');
  }

  res.json({ success: true, data: order });
});

// @desc  Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid order ID');
  }
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  if (order.orderStatus === 'Cancelled') {
    res.status(400);
    throw new Error('Cannot mark a cancelled order as paid');
  }
  order.paymentStatus = 'Paid';
  order.paidAt        = Date.now();
  order.orderStatus   = 'Confirmed';
  const updated = await order.save();
  res.json({ success: true, data: updated });
});

// @desc  Cancel order
// @route PUT /api/orders/:id/cancel
// @access Private
export const cancelOrder = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid order ID');
  }
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (['Shipped', 'Delivered'].includes(order.orderStatus)) {
    res.status(400);
    throw new Error('Cannot cancel order after it has been shipped');
  }

  order.orderStatus = 'Cancelled';
  const updated = await order.save();
  res.json({ success: true, data: updated });
});

// ── Admin ──

// @desc  Get all orders  (Admin)
// @route GET /api/orders
// @access Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate('user', 'name email');

  res.json({ success: true, count: orders.length, data: orders });
});

// @desc  Update order status  (Admin)
// @route PUT /api/orders/:id/status
// @access Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error(`Invalid status. Valid: ${validStatuses.join(', ')}`);
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      orderStatus: status,
      ...(status === 'Delivered' ? { deliveredAt: Date.now() } : {}),
    },
    { new: true }
  );

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json({ success: true, data: order });
});
