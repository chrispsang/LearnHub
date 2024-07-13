// src/pages/CourseDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import featuredCourses from '../data/featuredCourses';

interface Course {
  id: string;
  title: string;
  description: string;
  keyPoints: string[];
  courseStructure: string[];
  targetAudience: string[];
  prerequisites: string;
}

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      // Check if the course is a featured course
      const featuredCourse = featuredCourses.find((course) => course.id === courseId);
      if (featuredCourse) {
        setCourse(featuredCourse);
        setLoading(false);
        return;
      }

      // If not a featured course, fetch from backend
      try {
        const response = await axios.get<Course>(`http://localhost:5001/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h3>Key Points</h3>
      {course.keyPoints && course.keyPoints.length > 0 ? (
        <ul>
          {course.keyPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      ) : (
        <p>No key points available.</p>
      )}
      <h3>Course Structure</h3>
      {course.courseStructure && course.courseStructure.length > 0 ? (
        <ul>
          {course.courseStructure.map((structure, index) => (
            <li key={index}>{structure}</li>
          ))}
        </ul>
      ) : (
        <p>No course structure available.</p>
      )}
      <h3>Target Audience</h3>
      {course.targetAudience && course.targetAudience.length > 0 ? (
        <ul>
          {course.targetAudience.map((audience, index) => (
            <li key={index}>{audience}</li>
          ))}
        </ul>
      ) : (
        <p>No target audience information available.</p>
      )}
      <h3>Prerequisites</h3>
      <p>{course.prerequisites}</p>
    </div>
  );
};

export default CourseDetails;
