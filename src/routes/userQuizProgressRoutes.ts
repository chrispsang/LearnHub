// src/routes/userQuizProgress.ts
import express from 'express';
import { getUserQuizProgress, submitUserQuizProgress } from '../controllers/userQuizProgressController';

const router = express.Router();

router.get('/user/:userId/quiz/progress', getUserQuizProgress);
router.post('/user/quiz/progress', submitUserQuizProgress);

export default router;
