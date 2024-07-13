// src/controllers/quizController.ts
import { Request, Response } from 'express';

import Quiz from '../models/Quiz';
import UserQuizProgress from '../models/UserQuizProgress';
import Leaderboard from '../models/Leaderboard';
import { calculateUserScore } from '../utils/calculateUserScore';

export const getQuizzesByCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  try {
    const quizzes = await Quiz.findAll({ where: { course_id: courseId } });
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Error fetching quizzes', error });
  }
};

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const { userId, quizId, score } = req.body;

    if (!userId || !quizId || !score) {
      return res.status(400).json({ message: 'userId, quizId, and score are required.' });
    }

    let userQuizProgress = await UserQuizProgress.findOne({
      where: { user_id: userId, quiz_id: quizId },
    });

    if (userQuizProgress) {
      userQuizProgress.score = score;
      userQuizProgress.completed = true;
      await userQuizProgress.save();
    } else {
      userQuizProgress = await UserQuizProgress.create({
        user_id: userId,
        quiz_id: quizId,
        score,
        completed: true,
      });
    }

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    const userScore = await calculateUserScore(userId, quiz.course_id);

    await Leaderboard.upsert({
      userId,
      courseId: quiz.course_id,
      score: userScore
    });

    return res.status(201).json({ message: 'Quiz progress saved.', data: userQuizProgress });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return res.status(500).json({ message: 'Internal server error.', error });
  }
};