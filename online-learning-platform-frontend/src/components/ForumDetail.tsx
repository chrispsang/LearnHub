// ForumDetail.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/ForumDetail.css'; 

interface Reply {
    id: string;
    content: string;
    userId: string;
    username: string;
    forumId: string;
    parentId: string | null;
    createdAt: string; 
}

interface Forum {
    id: string;
    subject: string;
    message: string;
    userId: string;
    username: string;
    courseId: string;
    createdAt: string; 
}

const ForumDetail: React.FC = () => {
    const params = useParams<{ courseId: string, forumId: string }>();
    const { courseId, forumId } = params;
    const [forum, setForum] = useState<Forum | null>(null);
    const [replies, setReplies] = useState<Reply[]>([]);
    const [mainReplyContent, setMainReplyContent] = useState(''); // State for main forum reply content
    const [nestedReplyContent, setNestedReplyContent] = useState(''); // State for nested reply content
    const { userId, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [replyToId, setReplyToId] = useState<string | null>(null);

    useEffect(() => {
        if (courseId && forumId) {
            fetchForum();
            fetchReplies();
        }
    }, [courseId, forumId]);

    const fetchForum = async () => {
        try {
            const response = await axios.get<Forum>(`http://localhost:5001/api/forum/${forumId}`);
            setForum(response.data);
        } catch (error) {
            console.error('Error fetching forum:', error);
        }
    };

    const fetchReplies = async () => {
        try {
            const response = await axios.get<Reply[]>(`http://localhost:5001/api/forum/${forumId}/replies`);
            setReplies(response.data);
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };

    const createReply = async (content: string, parentId: string | null = null) => {
        if (!isAuthenticated || !userId || !forum?.id) {
            console.error('User not authenticated or missing data');
            return;
        }

        try {
            const response = await axios.post<Reply>(`http://localhost:5001/api/forum/${forum?.id}/reply`, {
                content,
                userId,
                parentId,
            });
            setReplies([...replies, response.data]);
            if (parentId) {
                setNestedReplyContent('');
            } else {
                setMainReplyContent('');
            }
            setReplyToId(null);
        } catch (error) {
            console.error('Error creating reply:', error);
        }
    };

    const handleReplyClick = (replyId: string | null) => {
        setReplyToId(replyId);
        setNestedReplyContent(''); // Clear the nested reply content when a new reply is clicked
    };

    const handleBack = () => {
        navigate(-1);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const renderReplies = (parentId: string | null = null) => {
        return replies
            .filter(reply => reply.parentId === parentId)
            .map(reply => (
                <div key={reply.id} className="reply-container">
                    <p><strong>{reply.username}:</strong> {reply.content}</p>
                    <p className="timestamp">{formatDate(reply.createdAt)}</p>
                    <div className="reply-action" onClick={() => handleReplyClick(reply.id)}>
                        Reply
                    </div>
                    {reply.id === replyToId && (
                        <div className="reply-form">
                            <textarea
                                value={nestedReplyContent}
                                onChange={(e) => setNestedReplyContent(e.target.value)}
                                placeholder="Write your reply"
                                className="reply-textarea"
                            />
                            <button onClick={() => createReply(nestedReplyContent, reply.id)} className="reply-button">Post Reply</button>
                        </div>
                    )}
                    <div className="nested-replies">
                        {renderReplies(reply.id)}
                    </div>
                </div>
            ));
    };

    if (!forum) {
        return <p>Loading forum...</p>;
    }

    return (
        <div className="forum-container">
            <button onClick={handleBack} className="back-button">Back</button>
            <div className="forum-header">
                <h2>{forum.subject}</h2>
                <p>By: {forum.username}</p>
                <p>{forum.message}</p>
                <p className="timestamp">{formatDate(forum.createdAt)}</p>
            </div>
            <div className="reply-form">
                <textarea
                    value={mainReplyContent}
                    onChange={(e) => setMainReplyContent(e.target.value)}
                    placeholder="Write your reply"
                    className="reply-textarea"
                />
                <button onClick={() => createReply(mainReplyContent)} className="reply-button">Post Reply</button>
            </div>
            <h3>Replies</h3>
            <div className="replies-container">
                {renderReplies()}
            </div>
        </div>
    );
};

export default ForumDetail;
