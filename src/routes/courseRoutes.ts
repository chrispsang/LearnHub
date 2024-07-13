// src/routes/courseRoutes.ts
import { Router } from 'express';
import { getCourses, getCourseById,  searchCourses } from '../controllers/courseController';

const router = Router();

router.get('/search', searchCourses);
router.get('/', getCourses);
router.get('/:id', getCourseById);

export default router;

