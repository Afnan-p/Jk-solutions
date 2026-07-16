import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Upload a single file
router.post('/', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // req.file.path contains the secure cloudinary url since we are using multer-storage-cloudinary
    res.status(200).json({ 
      message: 'Image uploaded successfully',
      url: req.file.path 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
