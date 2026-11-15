import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  id:    { type: String, required: true },
  name:  { type: String, required: true },
  emoji: { type: String, default: '' },
});

const categorySchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    tagline:  { type: String, default: '' },
    emoji:    { type: String, default: '' },
    img:      { type: String, default: '' },
    heroBg:   { type: String, default: '' },
    subcategories: [subcategorySchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
