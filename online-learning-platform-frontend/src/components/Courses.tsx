// src/components/Courses.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Courses.css';

interface Course {
  id: string;
  title: string;
  description: string;
}

interface QuizProgress {
  quiz_id: number;
  score: number;
  completed: boolean;
  Quiz: {
    id: number;
    course_id: string;
    sequence: number;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
    createdAt: string;
    updatedAt: string;
    Course: {
      title: string;
    } | null; 
  };
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [quizProgress, setQuizProgress] = useState<QuizProgress[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingQuizProgress, setLoadingQuizProgress] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>('http://localhost:5001/api/courses');
        const sortedCourses = response.data.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        setCourses(sortedCourses);
        setLoadingCourses(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoadingCourses(false);
      }
    };

    const fetchQuizProgress = async () => {
      if (!isAuthenticated || !userId) return;

      try {
        const response = await axios.get<QuizProgress[]>(`http://localhost:5001/api/user/${userId}/quiz/progress`);
        setQuizProgress(response.data);
        setLoadingQuizProgress(false);
      } catch (error) {
        console.error('Error fetching quiz progress:', error);
        setLoadingQuizProgress(false);
      }
    };

    fetchCourses();
    fetchQuizProgress();
  }, [isAuthenticated, userId]);

  const viewQuizzes = (courseId: string) => {
    navigate(`/quiz/${courseId}`);
  };

  const calculatePercentage = (score: number, maxScore: number) => {
    return ((score / maxScore) * 100).toFixed(2);
  };

  const getQuizProgress = (courseId: string) => {
    const courseQuizProgress = quizProgress.filter((progress) => progress.Quiz.course_id === courseId);
    const notCompletedQuizzes = courseQuizProgress.filter(progress => !progress.completed);

    return (
      <div className="quiz-progress">
        {notCompletedQuizzes.length > 0 && (
          <div>
            <h4>Not Completed Quizzes</h4>
            {notCompletedQuizzes.map((progress) => (
              <div key={progress.quiz_id}>
                <p>Quiz ID: {progress.quiz_id}</p>
                <p>Completion: <span className="not-completed">Not Completed</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="courses-container">
      <h2>Available Courses</h2>
      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.id} className="course-card">
            <div className="course-title">{course.title}</div>
            <div className="course-description">
              {course.description}
              <Link to={`/courses/${course.id}`} className="more-info-link">More Info</Link>
            </div>
            <div className="course-actions">
              <button className="view-quizzes-button" onClick={() => viewQuizzes(course.id)}>View Quizzes</button>
              <Link to={`/leaderboard/${course.id}`} className="leaderboard-link">View Leaderboard</Link>
              <Link to={`/course/${course.id}/forums`}>View Discussion Forum</Link>
            </div>
            {getQuizProgress(course.id)}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Courses;
