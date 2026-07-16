import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getSettings); // Publicly accessible to fetch on homepage
router.put('/', protect, updateSettings);

export default router;
