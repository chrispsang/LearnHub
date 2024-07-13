// src/controllers/leaderboardController.ts
import { Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';
import User from '../models/User';
import Quiz from '../models/Quiz';
import UserQuizProgress from '../models/UserQuizProgress';
import Course from '../models/Course';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.findAll({
      order: [['score', 'DESC']],
      include: [
        { model: User, as: 'User', attributes: ['id', 'username'] },
        { model: Course, as: 'Course' },
      ],
    });

    const leaderboardWithPercentage = await Promise.all(
      leaderboard.map(async (entry) => {
        const userQuizProgress = await UserQuizProgress.findAll({
          where: { user_id: entry.userId },
          include: [{
            model: Quiz,
            as: 'Quiz',
            include: [{ model: Course, as: 'course' }], // Change to 'course'
          }],
        });

        let totalScore = 0;
        let totalQuestions = 0;
        userQuizProgress.forEach((progress) => {
          if (
            progress &&
            progress.Quiz &&
            progress.Quiz.course && // Change to 'course'
            progress.Quiz.course.id === entry.courseId
          ) {
            totalScore += progress.score;
            totalQuestions += progress.Quiz.total_questions;
          }
        });

        return {
          ...entry.toJSON(),
          percentage: totalQuestions
            ? ((totalScore / totalQuestions) * 100).toFixed(2)
            : '0.00',
        };
      })
    );

    res.json(leaderboardWithPercentage);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
};

export const getLeaderboardByCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  try {
    const leaderboard = await Leaderboard.findAll({
      where: { courseId: Number(courseId) },
      order: [['score', 'DESC']],
      include: [
        { model: User, as: 'User', attributes: ['id', 'username'] },
        { model: Course, as: 'Course' },
      ],
    });

    const leaderboardWithPercentage = await Promise.all(
      leaderboard.map(async (entry) => {
        const userQuizProgress = await UserQuizProgress.findAll({
          where: { user_id: entry.userId },
          include: [{
            model: Quiz,
            as: 'Quiz',
            include: [{ model: Course, as: 'course' }],
          }],
        });

        let totalScore = 0;
        let totalQuestions = 0;
        userQuizProgress.forEach((progress) => {
          if (
            progress &&
            progress.Quiz &&
            progress.Quiz.course &&
            progress.Quiz.course.id === Number(courseId)
          ) {
            totalScore += progress.score;
            totalQuestions += progress.Quiz.total_questions;
          }
        });

        return {
          ...entry.toJSON(),
          totalQuestions,
          percentage: totalQuestions
            ? ((totalScore / totalQuestions) * 100).toFixed(2)
            : '0.00',
          rank: 0, // Add the rank property with a default value
        };
      })
    );

    // Calculate ranks
    leaderboardWithPercentage.sort((a, b) => b.score - a.score);

    let currentRank = 1;
    for (let i = 0; i < leaderboardWithPercentage.length; i++) {
      if (i > 0 && leaderboardWithPercentage[i].score === leaderboardWithPercentage[i - 1].score) {
        leaderboardWithPercentage[i].rank = leaderboardWithPercentage[i - 1].rank;
      } else {
        leaderboardWithPercentage[i].rank = currentRank;
      }
      currentRank++;
    }

    res.json(leaderboardWithPercentage);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
};
