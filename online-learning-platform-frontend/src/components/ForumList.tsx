import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/ForumList.css';

interface Forum {
    id: string;
    subject: string;
    userId: string;
    username: string;
    courseId: string;
}

interface Course {
    id: string;
    title: string;
    description: string;
}

const ForumList: React.FC = () => {
    const [forums, setForums] = useState<Forum[]>([]);
    const [course, setCourse] = useState<Course | null>(null);
    const [newForumSubject, setNewForumSubject] = useState('');
    const [newForumMessage, setNewForumMessage] = useState('');
    const { userId, isAuthenticated } = useAuth();
    const { courseId } = useParams<{ courseId: string }>();

    useEffect(() => {
        console.log(`Fetching forums for courseId: ${courseId}`);
        fetchCourseDetails();
        fetchForums();
    }, [courseId]);

    const fetchCourseDetails = async () => {
        try {
            const response = await axios.get<Course>(`http://localhost:5001/api/courses/${courseId}`);
            setCourse(response.data);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const fetchForums = async () => {
        try {
            console.log(`Sending GET request to: http://localhost:5001/api/course/${courseId}/forums`);
            const response = await axios.get<Forum[]>(`http://localhost:5001/api/course/${courseId}/forums`);
            console.log('Forums fetched:', response.data);
            setForums(response.data);
        } catch (error) {
            console.error('Error fetching forums:', error);
        }
    };

    const createForum = async () => {
        if (!isAuthenticated || !userId) {
            console.error('User not authenticated');
            return;
        }

        const forumData = {
            subject: newForumSubject,
            message: newForumMessage,
            userId,
            courseId,
        };

        try {
            const response = await axios.post<Forum>('http://localhost:5001/api/forum', forumData);
            setForums([...forums, response.data]);
            setNewForumSubject('');
            setNewForumMessage('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                    console.error('Error response status:', error.response.status);
                    console.error('Error response headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Error request data:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    return (
        <div className="forum-list-container">
            <h1 className="forum-list-header">Forums for {course ? course.title : `Course ${courseId}`}</h1>
            <ul>
                {forums.map(forum => (
                    <li key={forum.id} className="forum-item">
                        <Link to={`/course/${courseId}/forum/${forum.id}`} className="forum-link">
                            {forum.subject} - Created by {forum.username}
                        </Link>
                    </li>
                ))}
            </ul>
            {forums.length === 0 && <p className="no-forums-message">No forums yet</p>}
            <div className="forum-inputs">
                <input
                    type="text"
                    value={newForumSubject}
                    onChange={(e) => setNewForumSubject(e.target.value)}
                    placeholder="New forum subject"
                    className="forum-input"
                />
                <textarea
                    value={newForumMessage}
                    onChange={(e) => setNewForumMessage(e.target.value)}
                    placeholder="Forum message"
                    className="forum-textarea"
                />
                <button onClick={createForum} className="create-forum-button">Create Forum</button>
            </div>
        </div>
    );
};

export default ForumList;
