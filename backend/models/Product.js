import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  label:    { type: String, required: true },
  original: { type: Number, required: true },
  price:    { type: Number, required: true },
  discount: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema(
  {
    // ── Basic / list fields ──
    category:    { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcat:      { type: String, required: true },
    name:        { type: String, required: true, trim: true },
    weight:      { type: String, required: true },
    original:    { type: Number, required: true },
    price:       { type: Number, required: true },
    discount:    { type: Number, default: 0 },
    inStock:     { type: Boolean, default: true },
    img:         { type: String, default: '' },

    // ── Detail fields ──
    brand:       { type: String, default: '' },
    type:        { type: String, default: '' },
    shelfLife:   { type: String, default: '12 Months' },
    description: { type: String, default: '' },
    rating:      { type: Number, default: 4.0, min: 0, max: 5 },
    reviews:     { type: Number, default: 0 },
    features:    [{ type: String }],
    images:      [{ type: String }],
    variants:    [variantSchema],

    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Index for fast queries
productSchema.index({ category: 1, subcat: 1 });
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
