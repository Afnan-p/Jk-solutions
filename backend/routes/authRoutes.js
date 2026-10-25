import express from 'express';
import { loginAdmin, registerInitialAdmin, getAdminProfile, updateAdminCredentials } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/setup', registerInitialAdmin);
router.get('/profile', protect, getAdminProfile);
router.put('/update-credentials', protect, updateAdminCredentials);

export default router;
