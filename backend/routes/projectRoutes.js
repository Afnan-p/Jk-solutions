import express from 'express';
import { getProjects, createProject, getProjectById, getProjectBySlug, getProjectsByService, updateProject, deleteProject } from '../controllers/projectController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, createProject);

router.route('/slug/:slug')
  .get(getProjectBySlug);

router.route('/service/:serviceSlug')
  .get(getProjectsByService);

router.route('/:id')
  .get(getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
