// src/components/Leaderboard.tsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/Leaderboard.css';

interface LeaderboardProps {
  courseId: string;
}

interface LeaderboardEntry {
  id: number;
  userId: number;
  courseId: number;
  score: number;
  totalQuestions: number;
  percentage: string;
  rank: number;
  User?: { id: number; username: string };
}

interface Course {
  id: number;
  title: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ courseId }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchLeaderboard = async () => {
    try {
      const [leaderboardResponse, courseResponse] = await Promise.all([
        axios.get<LeaderboardEntry[]>(`http://localhost:5001/api/leaderboard/${courseId}`),
        axios.get<Course>(`http://localhost:5001/api/courses/${courseId}`)
      ]);
      setLeaderboard(leaderboardResponse.data);
      setCourse(courseResponse.data);
    } catch (err) {
      setError('Error fetching leaderboard or course information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // Set up polling
    intervalRef.current = setInterval(fetchLeaderboard, 10000); // Poll every 10 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [courseId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="leaderboard">
      <h3>Leaderboard for {course?.title}</h3>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry) => (
            <tr key={entry.id}>
              <td data-label="Rank">{entry.rank}</td>
              <td data-label="Username">{entry.User ? entry.User.username : 'Anonymous'}</td>
              <td data-label="Score">{entry.score}/{entry.totalQuestions}</td>
              <td data-label="Percentage">{entry.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
