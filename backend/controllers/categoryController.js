import asyncHandler from 'express-async-handler';
import Category from '../models/Category.js';

// @desc  Get all categories
// @route GET /api/categories
// @access Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).select('-__v');
  res.json({ success: true, count: categories.length, data: categories });
});

// @desc  Get single category by ID
// @route GET /api/categories/:id
// @access Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json({ success: true, data: category });
});

// @desc  Create category  (Admin)
// @route POST /api/categories
// @access Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name, tagline, emoji, img, heroBg, subcategories } = req.body;
  const category = await Category.create({ name, tagline, emoji, img, heroBg, subcategories });
  res.status(201).json({ success: true, data: category });
});

// @desc  Update category  (Admin)
// @route PUT /api/categories/:id
// @access Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  });
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json({ success: true, data: category });
});

// @desc  Delete category  (Admin)
// @route DELETE /api/categories/:id
// @access Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json({ success: true, message: 'Category deactivated' });
});
