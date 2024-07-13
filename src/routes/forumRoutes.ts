// src/routes/forumRoutes.ts
import { Router } from 'express';
import { createForum, getCourseForums, getForumReplies, createReply, getForumById } from '../controllers/forumController';

const router = Router();

router.post('/forum', createForum); // Create a forum for a course
router.get('/course/:courseId/forums', getCourseForums); // Get forums for a course
router.get('/forum/:forumId/replies', getForumReplies); // Get replies in a forum
router.post('/forum/:forumId/reply', createReply); // Create a reply to a forum
router.get('/forum/:forumId', getForumById);

export default router;
