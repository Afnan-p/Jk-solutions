import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup Multer Storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: process.env.CLOUDINARY_FOLDER || 'jk-solutions', // Dedicated folder in client's Cloudinary
    format: async (req, file) => 'webp', // Automatically optimize and convert to webp
    public_id: (req, file) => {
      // Create a clean unique filename with timestamp
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const cleanOriginalName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9_-]/g, '_');
      return `${cleanOriginalName}-${uniqueSuffix}`;
    },
  },
});

export const   upload = multer({ storage: storage });
export { cloudinary };
