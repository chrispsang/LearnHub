// src/utils/calculateUserScore.ts
import UserQuizProgress from '../models/UserQuizProgress';
import Quiz from '../models/Quiz';
import Course from '../models/Course'; 

export const calculateUserScore = async (userId: number, courseId: number): Promise<number> => {
  const userQuizProgressList = await UserQuizProgress.findAll({
    where: { user_id: userId },
    include: [{
      model: Quiz,
      as: 'Quiz',
      include: [{ model: Course, as: 'course' }]
    }]
  });

  let totalScore = 0;
  userQuizProgressList.forEach(progress => {
    if (progress && progress.Quiz && progress.Quiz.course && progress.Quiz.course.id === courseId) {
      totalScore += progress.score;
    }
  });

  return totalScore;
};
