import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc  Get all products (with filters, search, sort, pagination)
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const {
    category, subcat,
    search, sortBy,
    page = 1, limit = 12,
    inStock,
  } = req.query;

  const filter = { isActive: true };

  if (category) filter.category = category;
  if (subcat)   filter.subcat   = subcat;
  if (inStock !== undefined) filter.inStock = inStock === 'true';

  // Text search
  if (search) {
    filter.$text = { $search: search };
  }

  // Sort
  const sortOptions = {
    'price-low':  { price: 1 },
    'price-high': { price: -1 },
    'discount':   { discount: -1 },
    'name':       { name: 1 },
    'newest':     { createdAt: -1 },
    'default':    { createdAt: -1 },
  };
  const sort = sortOptions[sortBy] || sortOptions['default'];

  const pageNum  = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip     = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sort).skip(skip).limit(limitNum)
      .populate('category', 'name img'),
    Product.countDocuments(filter),
  ]);

  res.json({
    success: true,
    total,
    page:       pageNum,
    totalPages: Math.ceil(total / limitNum),
    count:      products.length,
    data:       products,
  });
});

// @desc  Get active product counts grouped by category and subcategory
// @route GET /api/products/counts
// @access Public
export const getProductCounts = asyncHandler(async (req, res) => {
  const counts = await Product.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: { category: '$category', subcat: '$subcat' },
        count: { $sum: 1 },
      },
    },
  ]);

  res.json({
    success: true,
    data: counts.map(({ _id, count }) => ({
      categoryId: String(_id.category),
      subcategoryId: _id.subcat,
      count,
    })),
  });
});

// @desc  Get single product by ID
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('category', 'name img tagline subcategories');

  if (!product || !product.isActive) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ success: true, data: product });
});

// @desc  Get related products (same subcat, different id)
// @route GET /api/products/:id/related
// @access Public
export const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const related = await Product.find({
    category: product.category,
    subcat:   product.subcat,
    _id:      { $ne: product._id },
    isActive: true,
  }).limit(6).select('name weight price original discount inStock img subcat');

  res.json({ success: true, count: related.length, data: related });
});

// @desc  Create product  (Admin)
// @route POST /api/products
// @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

// @desc  Update product  (Admin)
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, data: product });
});

// @desc  Delete product  (Admin — soft delete)
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, message: 'Product deactivated' });
});
