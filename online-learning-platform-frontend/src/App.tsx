// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Course from './pages/CoursePage';
import QuizPage from './pages/QuizPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CourseDetailPage from './pages/CourseDetailPage';
import './styles/App.css';
import ForumList from './components/ForumList';
import ForumDetail from './components/ForumDetail';
import CompletedQuizzes from './components/CompletedQuizzes';
import ReviewPage from './pages/ReviewPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar isLoggedIn={isAuthenticated} onLogout={logout} />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <LoginPage />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/quiz/:courseId" element={<QuizPage />} />
        <Route path="/leaderboard/:courseId" element={<LeaderboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/course/:courseId/forums" element={<ForumList />} />
        <Route path="/course/:courseId/forum/:forumId" element={<ForumDetail />} /> 
        <Route path="/completed-quizzes" element={<CompletedQuizzes />} />
        <Route path="/reviews" element={<ReviewPage />} /> 

      </Routes>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Online Learning Platform</p>
        <div className="social-media">
          <span>Follow Us:</span>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </>
  );
};

export default App;