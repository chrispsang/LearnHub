// src/components/UserQuizProgress.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UserQuizProgress.css'; 

interface Course {
  id: number;
  title: string;
}

interface Quiz {
  id: number;
  question: string;
  course_id: number;
  course: Course;
  total_questions: number; // Add total_questions field
}

interface QuizProgress {
  id: number;
  user_id: number;
  quiz_id: number;
  score: number;
  completed: boolean;
  Quiz: Quiz;
}

interface UserQuizProgressProps {
  userId: number;
}

const UserQuizProgress: React.FC<UserQuizProgressProps> = ({ userId }) => {
  const [quizProgress, setQuizProgress] = useState<QuizProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizProgress = async () => {
      try {
        const response = await axios.get<QuizProgress[]>(`http://localhost:5001/api/user/${userId}/quiz/progress`);
        console.log('Quiz Progress:', response.data);
        setQuizProgress(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setQuizProgress([]);
        } else {
          setError('Error fetching quiz progress');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuizProgress();
  }, [userId]);

  const calculatePercentage = (score: number, totalQuestions: number) => {
    return ((score / totalQuestions) * 100).toFixed(2);
  };

  if (loading) {
    return <div>Loading quiz progress...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-quiz-progress">
      <h2>Your Quiz Progress</h2>
      {quizProgress.length > 0 ? (
        <ul>
          {quizProgress.map((progress) => (
            <li key={progress.id}>
              <div className="course-title">{progress.Quiz.course?.title || 'Unknown'}</div>
              <div className="quiz-details">
                Quiz ID: <span>{progress.Quiz.id}</span>, Score: <span>{progress.score}/{progress.Quiz.total_questions}</span>, Percentage: <span>{calculatePercentage(progress.score, progress.Quiz.total_questions)}%</span>, Completed: <span>{progress.completed ? 'Yes' : 'No'}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No quiz progress available.</div>
      )}
    </div>
  );
};

export default UserQuizProgress;
