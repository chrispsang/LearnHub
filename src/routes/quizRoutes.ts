// src/routes/quizRoutes.ts
import { Router } from 'express';
import { getQuizzesByCourse, submitQuiz } from '../controllers/quizController';

const router = Router();

router.get('/:courseId', getQuizzesByCourse);
router.post('/submit', submitQuiz);

export default router;
