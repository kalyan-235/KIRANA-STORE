const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const imageUrl = (src) => {
  if (!src || !CLOUDINARY_CLOUD_NAME || !src.startsWith('/')) return src;

  const fileName = src.split('/').pop();
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/kirana-store/assets/${encodeURIComponent(fileName)}`;
};
