import { v2 as cloudinary } from 'cloudinary';

export const getCloudinary = () => {
  if (!process.env.CLOUDINARY_URL) {
    throw new Error('CLOUDINARY_URL is not configured');
  }

  cloudinary.config(true);
  cloudinary.config({ secure: true });
  return cloudinary;
};

export const uploadImageBuffer = (buffer, options) => {
  const client = getCloudinary();

  return new Promise((resolve, reject) => {
    const stream = client.uploader.upload_stream(
      { folder: 'kirana-store', resource_type: 'image', ...options },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Cloudinary returned no upload result'));
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};
