import express from 'express';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getTestimonials); // Publicly accessible to fetch on homepage
router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

export default router;
