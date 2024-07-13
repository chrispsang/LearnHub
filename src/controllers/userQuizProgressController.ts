// src/controllers/userQuizProgressController.ts
import { Request, Response } from 'express';
import UserQuizProgress from '../models/UserQuizProgress';
import Leaderboard from '../models/Leaderboard';
import Quiz from '../models/Quiz';
import Course from '../models/Course';
import { calculateUserScore } from '../utils/calculateUserScore';

export const submitUserQuizProgress = async (req: Request, res: Response) => {
  const { userId, quizId, score, completed } = req.body;

  try {
    let userQuizProgress = await UserQuizProgress.findOne({ where: { user_id: userId, quiz_id: quizId } });

    if (userQuizProgress) {
      userQuizProgress.score = score;
      userQuizProgress.completed = completed;
      await userQuizProgress.save();
    } else {
      userQuizProgress = await UserQuizProgress.create({
        user_id: userId,
        quiz_id: quizId,
        score,
        completed,
      });
    }

    const quiz = await Quiz.findByPk(quizId, {
      include: { model: Course, as: 'course' },
    });

    if (!quiz || !quiz.course) {
      throw new Error('Course not found for the provided quizId');
    }

    // Calculate the new total score for the user in the related course
    const userScore = await calculateUserScore(userId, quiz.course.id);

    const leaderboardEntry = await Leaderboard.findOne({ where: { userId, courseId: quiz.course.id } });

    if (leaderboardEntry) {
      leaderboardEntry.score = userScore;
      await leaderboardEntry.save();
    } else {
      await Leaderboard.create({ userId, courseId: quiz.course.id, score: userScore });
    }

    res.status(200).json({ message: 'Quiz progress stored and leaderboard updated successfully', data: userQuizProgress });
  } catch (error) {
    console.error('Error storing quiz progress and updating leaderboard:', error);
    res.status(500).json({ message: 'Failed to store quiz progress and update leaderboard' });
  }
};


export const getUserQuizProgress = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const progress = await UserQuizProgress.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Quiz,
          as: 'Quiz',
          include: [
            {
              model: Course,
              as: 'course',
              attributes: ['id', 'title'],
            },
          ],
        },
      ],
    });

    if (!progress.length) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    res.json(progress);
  } catch (error) {
    console.error('Error fetching quiz progress:', error);
    res.status(500).json({ message: 'Failed to fetch quiz progress' });
  }
};
