import express from 'express';
import { getServices, createService, getServiceById, getServiceBySlug, updateService, deleteService } from '../controllers/serviceController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protect, createService);

router.route('/slug/:slug')
  .get(getServiceBySlug);

router.route('/:id')
  .get(getServiceById)
  .put(protect, updateService)
  .delete(protect, deleteService);

export default router;
