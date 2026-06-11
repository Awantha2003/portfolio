const CLOUDINARY_IMAGE_ORIGIN = 'https://res.cloudinary.com/';

export const getDisplayImageUrl = (imageUrl: string) => {
  if (!imageUrl.startsWith(CLOUDINARY_IMAGE_ORIGIN)) {
    return imageUrl;
  }

  return `/api/cloudinary-image?url=${encodeURIComponent(imageUrl)}`;
};
