// src/routes/leaderboardRoutes.ts
import { Router } from 'express';
import { getLeaderboard, getLeaderboardByCourse  } from '../controllers/leaderboardController';

const router = Router();

router.get('/', getLeaderboard);
router.get('/:courseId', getLeaderboardByCourse);


export default router;
