import asyncHandler from 'express-async-handler';
import { uploadImageBuffer } from '../config/cloudinary.js';

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Provide an image file in the "image" field');
  }

  if (!['image/jpeg', 'image/png', 'image/webp'].includes(req.file.mimetype)) {
    res.status(400);
    throw new Error('Only JPEG, PNG, and WebP images are supported');
  }

  const image = await uploadImageBuffer(req.file.buffer, {
    folder: 'kirana-store/catalog',
  });

  res.status(201).json({
    success: true,
    data: { url: image.secure_url, publicId: image.public_id },
  });
});
