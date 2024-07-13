// src/pages/LeaderboardPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Leaderboard from '../components/Leaderboard';
import '../styles/Leaderboard.css';

interface Course {
  id: number;
  title: string;
}

const LeaderboardPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get<Course>(`http://localhost:5001/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (err) {
        setError('Error fetching course');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (loading) {
    return <div className="page-container">Loading course and leaderboard...</div>;
  }

  if (error) {
    return <div className="page-container">{error}</div>;
  }

  return (
    <div className="page-container">
      <h1 className="title">Leaderboard for Course {course?.title}</h1>
      <div className="leaderboard-container">
        <Leaderboard courseId={courseId || ''} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
