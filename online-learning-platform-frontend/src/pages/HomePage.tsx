// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import featuredCourses from '../data/featuredCourses';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h2>Welcome to Our Online Learning Platform</h2>
        <p>Explore our courses and take quizzes to test your knowledge.</p>
        <Link to="/courses" className="get-started-button">Get Started</Link>
      </div>

      <div className="featured-courses">
        <h3>Featured Courses</h3>
        <ul>
          {featuredCourses.map(course => (
            <li key={course.id}>
              <Link to={`/courses/${course.id}`}>
                {course.title}
              </Link>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="user-testimonials">
        <h3>What Our Users Say</h3>
        <p>"Great platform for learning! The quizzes are challenging yet fun."</p>
        <p>"I improved my skills a lot with the courses here."</p>
      </div>

    </div>
  );
};

export default HomePage;
