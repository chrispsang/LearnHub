// src/routes/reviewRoutes.ts
import { Router } from 'express';
import { createReview, getReviewsByCourse } from '../controllers/reviewController';

const router = Router();

router.post('/reviews', createReview);
router.get('/courses/:courseId/reviews', getReviewsByCourse);

export default router;
