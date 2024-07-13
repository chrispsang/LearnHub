// src/components/ReviewList.tsx
import React from 'react';
import '../styles/ReviewList.css';

interface Review {
  id: number;
  userId: number;
  courseId: number;
  rating: number;
  comment?: string;
  User: { username: string };
}

interface ReviewListProps {
  courseId: number;
  courseTitle: string;
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ courseId, courseTitle, reviews }) => {
  return (
    <div className="review-list">
      <h3>Reviews for "{courseTitle}"</h3>
      {reviews.length === 0 && <p>No reviews found.</p>}
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <p><strong>{review.User.username}</strong>: {review.rating}/5</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
