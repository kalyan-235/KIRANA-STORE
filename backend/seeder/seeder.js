import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import connectDB from '../config/db.js';
import { getCloudinary } from '../config/cloudinary.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { categorySeedData, buildProductSeedData } from './seedData.js';

dotenv.config();

const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.resolve(backendDir, '..', 'frontend', 'public');

const uploadSeedImages = async (categories, products) => {
  const cloudinary = getCloudinary();
  const paths = new Set([
    ...categories.map((category) => category.img),
    ...products.flatMap((product) => [product.img, ...(product.images || [])]),
  ].filter((image) => typeof image === 'string' && image.startsWith('/')));
  const imageUrls = new Map();

  for (const imagePath of paths) {
    const fileName = path.basename(imagePath);
    const localPath = path.resolve(publicDir, fileName);
    const uploaded = await cloudinary.uploader.upload(localPath, {
      folder: 'kirana-store/assets',
      public_id: path.parse(fileName).name,
      overwrite: true,
      resource_type: 'image',
    });
    imageUrls.set(imagePath, uploaded.secure_url);
  }

  const replaceImage = (image) => imageUrls.get(image) || image;
  return {
    categories: categories.map((category) => ({ ...category, img: replaceImage(category.img) })),
    products: products.map((product) => ({
      ...product,
      img: replaceImage(product.img),
      images: product.images?.map(replaceImage),
    })),
  };
};

// ── Admin user ──
const adminUser = {
  name:     'Ram Prasad',
  email:    'admin@gmail.com',
  phone:    '+91 98765 43210',
  password: 'admin@123',
  role:     'admin',
};

const importData = async () => {
  try {
    await connectDB();

    const categoryIds = Object.fromEntries(categorySeedData.map(({ name }) => [name, name]));
    const preparedSeedData = await uploadSeedImages(
      categorySeedData,
      buildProductSeedData(categoryIds)
    );

    let createdAdmin = await User.findOne({ email: adminUser.email });
    if (!createdAdmin) createdAdmin = await User.create(adminUser);
    console.log(`👤  Admin user ready: ${createdAdmin.email}`);

    const createdCategories = [];
    for (const categoryData of preparedSeedData.categories) {
      const category = await Category.findOneAndUpdate(
        { name: categoryData.name },
        { $set: categoryData },
        { new: true, upsert: true, runValidators: true }
      );
      createdCategories.push(category);
    }
    console.log(`📦  ${createdCategories.length} Categories seeded or updated`);

    // Build catName → _id map
    const catMap = {};
    createdCategories.forEach((c) => { catMap[c.name] = c._id; });

    // Build & insert products
    const productData = buildProductSeedData(catMap).map((product, index) => ({
      ...product,
      img: preparedSeedData.products[index].img,
      images: preparedSeedData.products[index].images,
    }));
    for (const product of productData) {
      await Product.findOneAndUpdate(
        { category: product.category, name: product.name },
        { $set: product },
        { new: true, upsert: true, runValidators: true }
      );
    }
    console.log(`🛒  ${productData.length} Products seeded or updated`);

    console.log('\n✅  Database seeded successfully!');
  } catch (error) {
    console.error(`❌  Seeder Error: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  All data destroyed!');
  } catch (error) {
    console.error(`❌  Destroy Error: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

// Run: node seeder/seeder.js        → import
//      node seeder/seeder.js -d     → destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
