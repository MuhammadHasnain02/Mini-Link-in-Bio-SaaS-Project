import { v2 as cloudinary } from 'cloudinary';

// Using a module initialization function to lazily configure Cloudinary
// This ensures environment variables are definitely loaded before attempting to configure.

const configureCloudinary = () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn("Cloudinary credentials are not set in the environment variables!");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  return cloudinary;
};

export default configureCloudinary;
