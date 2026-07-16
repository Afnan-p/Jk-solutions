import express from 'express';
import { loginAdmin, registerInitialAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/setup', registerInitialAdmin);

export default router;
