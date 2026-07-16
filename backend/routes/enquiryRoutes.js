import express from 'express';
import { getEnquiries, createEnquiry, updateEnquiryStatus, deleteEnquiry } from '../controllers/enquiryController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getEnquiries)
  .post(createEnquiry); // Public route for users to submit forms

router.route('/:id')
  .put(protect, updateEnquiryStatus)
  .delete(protect, deleteEnquiry);

export default router;
