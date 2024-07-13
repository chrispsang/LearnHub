// src/controllers/reviewController.ts
import { Request, Response } from 'express';
import Review from '../models/Review';
import UserQuizProgress from '../models/UserQuizProgress';
import User from '../models/User';
import Quiz from '../models/Quiz';

export const createReview = async (req: Request, res: Response) => {
  const { userId, courseId, rating, comment } = req.body;

  try {
    // Ensure the user has completed the course
    const completedQuizzes = await UserQuizProgress.findAll({
      where: { user_id: userId },
      include: [{
        model: Quiz,
        as: 'Quiz',
        where: { course_id: courseId }, // use course_id instead of courseId
      }],
    });

    if (!completedQuizzes.length) {
      return res.status(400).json({ message: 'User has not completed this course.' });
    }

    const review = await Review.create({
      userId,
      courseId,
      rating,
      comment,
    });

    const fullReview = await Review.findOne({
      where: { id: review.id },
      include: [{ model: User, as: 'User', attributes: ['id', 'username'] }],
    });

    res.status(201).json({ message: 'Review created successfully', review: fullReview });
  } catch (error: any) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
};


export const getReviewsByCourse = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  try {
    const reviews = await Review.findAll({
      where: { courseId },
      include: [{ model: User, as: 'User', attributes: ['id', 'username'] }],
    });

    res.json(reviews);
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

