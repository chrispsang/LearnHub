// src/components/Quiz.tsx
import React, { useState } from 'react';
import '../styles/QuizPage.css'; 

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface QuizProps {
  question: Question;
  pageNumber: number;
  totalPages: number;
  onNextQuestion: (selectedOption: string | null, isCorrect: boolean) => void;
  isLastQuestion: boolean;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  onSubmitQuiz: (selectedOption: string | null, isCorrect: boolean) => void;
}

const Quiz: React.FC<QuizProps> = ({
  question,
  pageNumber,
  totalPages,
  onNextQuestion,
  isLastQuestion,
  score,
  setScore,
  onSubmitQuiz,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    const isCorrect = selectedOption === question.answer;
    setShowAnswer(false);
    setSelectedOption(null);
    if (isLastQuestion) {
      onSubmitQuiz(selectedOption, isCorrect);
    } else {
      onNextQuestion(selectedOption, isCorrect);
    }
  };

  return (
    <div className="quiz">
      <div className="quiz-header">
        <div className="quiz-progress">
          Question {pageNumber} of {totalPages}
        </div>
        <h3>{question.question}</h3>
      </div>
      <div className="options">
        {question.options.map((option, index) => (
          <div key={index} className="option">
            <label>
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                disabled={showAnswer}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      {!showAnswer ? (
        <button className="quiz-button" onClick={handleSubmit} disabled={selectedOption === null}>
          Submit
        </button>
      ) : (
        <>
          <div className={`answer ${selectedOption === question.answer ? 'correct' : 'incorrect'}`}>
            {selectedOption === question.answer
              ? 'Correct!'
              : 'Incorrect! Please review the material and try again.'}
          </div>
          <button className="quiz-button" onClick={handleNext}>
            {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
