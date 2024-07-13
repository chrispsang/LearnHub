// src/pages/QuizPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Quiz from '../components/Quiz';
import { useAuth } from '../context/AuthContext';
import UserQuizProgress from '../components/UserQuizProgress';
import { AxiosError } from 'axios';
import '../styles/QuizPage.css'; 

interface Course {
  id: number;
  title: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  course: Course; 
}

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; selectedOption: string | null; isCorrect: boolean }[]>([]);
  const { courseId } = useParams<{ courseId: string }>();
  const { userId, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<Question[]>(`http://localhost:5001/api/quizzes/${courseId}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [courseId]);

  const handleSubmitQuiz = async (finalScore: number, finalUserAnswers: { questionId: number; selectedOption: string | null; isCorrect: boolean }[]) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/user/quiz/progress',
        {
          userId: userId,
          quizId: questions[currentQuestionIndex].id, // Pass the correct quizId here
          score: finalScore,
          completed: true,
        }
      );
      console.log('Quiz submission response:', response.data);
      setFinalScore(finalScore);
      setUserAnswers(finalUserAnswers);
      setCompleted(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Type assertion to AxiosError to access response and request properties
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Server responded with an error:', axiosError.response.data);
        } else if (axiosError.request) {
          // The request was made but no response was received
          console.error('No response received:', axiosError.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', axiosError.message);
        }
      } else {
        // Handle other types of errors
        console.error('Non-Axios error occurred:', error);
      }
    }
  };

  const handleNextQuestion = (selectedOption: string | null, isCorrect: boolean) => {
    const questionId = questions[currentQuestionIndex].id;
    const updatedUserAnswers = [...userAnswers, { questionId, selectedOption, isCorrect }];

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      handleSubmitQuiz(score + (isCorrect ? 1 : 0), updatedUserAnswers);
    } else {
      setUserAnswers(updatedUserAnswers);
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setFinalScore(null);
    setCompleted(false);
    setUserAnswers([]);
  };

  const handleLogout = () => {
    logout();
  };

  if (completed) {
    const percentageScore = ((finalScore! / questions.length) * 100).toFixed(2); // Calculate percentage score

    return (
      <div className="quiz-page">
        <h2>Quiz Completed!</h2>
        <p>Your final score is {finalScore}/{questions.length} ({percentageScore}%)</p> {/* Display percentage score */}
        <h3>Review Your Answers</h3>
        <ul>
          {userAnswers.map((answer, index) => {
            const question = questions.find(q => q.id === answer.questionId);
            return (
              <li key={index}>
                <p>Question: {question?.question}</p>
                <p>Your Answer: {answer.selectedOption}</p>
                <p>{answer.isCorrect ? 'Correct' : 'Incorrect! Please review the material and try again.'}</p>
              </li>
            );
          })}
        </ul>
        <button className="retake-quiz-button" onClick={handleRetakeQuiz}>
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-content">
        <h2>Quiz</h2>
        {questions.length > 0 && (
          <Quiz
            question={questions[currentQuestionIndex]}
            pageNumber={currentQuestionIndex + 1} // Calculate current page number
            totalPages={questions.length} // Total number of questions
            onNextQuestion={handleNextQuestion}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            score={score}
            setScore={setScore}
            onSubmitQuiz={(selectedOption: string | null, isCorrect: boolean) => handleNextQuestion(selectedOption, isCorrect)}
          />
        )}
      </div>
      {isAuthenticated && <UserQuizProgress userId={userId!} />}
    </div>
  );
};

export default QuizPage;
