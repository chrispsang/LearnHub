// src/components/CompletedQuizzes.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/CompletedQuizzes.css';

interface Course {
  title: string;
}

interface Quiz {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  course_id: number;
  course: Course | null;
  total_questions: number; // Add total_questions field
}

interface QuizProgress {
  quiz_id: number;
  score: number;
  completed: boolean;
  Quiz: Quiz;
}

const CompletedQuizzes: React.FC = () => {
  const [quizProgress, setQuizProgress] = useState<QuizProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, userId } = useAuth();

  useEffect(() => {
    const fetchQuizProgress = async () => {
      if (!isAuthenticated || !userId) return;

      try {
        const response = await axios.get<QuizProgress[]>(`http://localhost:5001/api/user/${userId}/quiz/progress`);
        setQuizProgress(response.data.filter(progress => progress.completed));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz progress:', error);
        setLoading(false);
      }
    };

    fetchQuizProgress();
  }, [isAuthenticated, userId]);

  const calculatePercentage = (score: number, maxScore: number) => {
    return ((score / maxScore) * 100).toFixed(2);
  };

  return (
    <div className="completed-quizzes">
      <h2>Completed Quizzes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : quizProgress.length > 0 ? (
        quizProgress.map((progress) => (
          <div key={progress.quiz_id} className="completed-quiz">
            <h3>{progress.Quiz.course?.title || 'Course Title Unavailable'}</h3>
            <p>Quiz ID: {progress.quiz_id}</p>
            <p>Score: {progress.score}/{progress.Quiz.total_questions}</p>
            <p>Percentage: {calculatePercentage(progress.score, progress.Quiz.total_questions)}%</p>
            <p>Completion: <span className="completed">Completed</span></p>
          </div>
        ))
      ) : (
        <p>No completed quizzes found.</p>
      )}
    </div>
  );
};

export default CompletedQuizzes;
