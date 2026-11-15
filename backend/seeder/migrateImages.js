import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import connectDB from '../config/db.js';
import { getCloudinary } from '../config/cloudinary.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

dotenv.config();

const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.resolve(backendDir, '..', 'frontend', 'public');

const migrateImages = async () => {
  try {
    await connectDB();
    const [categories, products] = await Promise.all([
      Category.find({}),
      Product.find({}),
    ]);
    const cloudinary = getCloudinary();
    const imageUrls = new Map();
    const imageFiles = fs.readdirSync(publicDir)
      .filter((fileName) => /\.(jpe?g|png|webp)$/i.test(fileName));

    for (const fileName of imageFiles) {
      const localPath = path.resolve(publicDir, fileName);
      const uploaded = await cloudinary.uploader.upload(localPath, {
        folder: 'kirana-store/assets',
        public_id: path.parse(fileName).name,
        overwrite: true,
        resource_type: 'image',
      });
      imageUrls.set(`/${fileName}`, uploaded.secure_url);
    }

    const cloudUrlFor = (image) => imageUrls.get(`/${path.basename(image)}`);
    const databaseImagePaths = [
      ...categories.map((category) => category.img),
      ...products.flatMap((product) => [product.img, ...(product.images || [])]),
    ].filter((image) => typeof image === 'string' && image.startsWith('/'));
    const missingImages = [...new Set(databaseImagePaths)]
      .filter((image) => !cloudUrlFor(image));
    if (missingImages.length > 0) {
      throw new Error(`Catalog image(s) are missing from frontend/public: ${missingImages.join(', ')}`);
    }

    for (const category of categories) {
      if (typeof category.img === 'string' && category.img.startsWith('/') && cloudUrlFor(category.img)) {
        category.img = cloudUrlFor(category.img);
        await category.save();
      }
    }

    for (const product of products) {
      let changed = false;
      if (typeof product.img === 'string' && product.img.startsWith('/') && cloudUrlFor(product.img)) {
        product.img = cloudUrlFor(product.img);
        changed = true;
      }
      product.images = (product.images || []).map((image) => {
        if (typeof image !== 'string' || !image.startsWith('/') || !cloudUrlFor(image)) return image;
        changed = true;
        return cloudUrlFor(image);
      });
      if (changed) await product.save();
    }

    console.log(`✅ Uploaded ${imageUrls.size} public image(s) and updated catalog image URLs.`);
  } catch (error) {
    console.error(`❌ Image migration failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

migrateImages();
