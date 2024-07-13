// src/models/associations.ts
import Course from './Course';
import Quiz from './Quiz';
import UserQuizProgress from './UserQuizProgress'; 

Course.hasMany(Quiz, { foreignKey: 'course_id', as: 'quizzes' });
Quiz.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
UserQuizProgress.belongsTo(Quiz, { foreignKey: 'quiz_id', as: 'quiz' });