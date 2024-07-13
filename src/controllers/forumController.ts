// src/controllers/forumController.ts
import { Request, Response } from 'express';
import Forum from '../models/Forum';
import User from '../models/User';
import Reply from '../models/Reply';

export const createForum = async (req: Request, res: Response) => {
    const { subject, message, userId, courseId } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const forum = await Forum.create({
            subject,
            message,
            userId,
            username: user.username,
            courseId,
        });
        res.status(201).json(forum);
    } catch (error) {
        console.error('Error creating forum:', error);
        res.status(500).json({ message: 'Failed to create forum', error });
    }
};

export const getCourseForums = async (req: Request, res: Response) => {
    const { courseId } = req.params;

    try {
        const forums = await Forum.findAll({ where: { courseId } });
        res.status(200).json(forums);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch forums', error });
    }
};

export const getForumReplies = async (req: Request, res: Response) => {
    const { forumId } = req.params;
    console.log('Fetching replies for forumId:', forumId); // Add this line

    try {
        const replies = await Reply.findAll({ where: { forumId } });
        console.log('Replies fetched from DB:', replies); // Add this line
        res.status(200).json(replies);
    } catch (error) {
        console.error('Error fetching replies:', error); // Add this line
        res.status(500).json({ message: 'Failed to fetch replies', error });
    }
};


export const createReply = async (req: Request, res: Response) => {
    const { content, userId, parentId } = req.body;
    const { forumId } = req.params;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const reply = await Reply.create({
            content,
            userId,
            username: user.username,
            forumId,
            parentId,
        });
        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create reply', error });
    }
};

export const getForumById = async (req: Request, res: Response) => {
    const { forumId } = req.params;

    try {
        const forum = await Forum.findByPk(forumId);
        if (!forum) {
            return res.status(404).send('Forum not found');
        }
        res.json(forum);
    } catch (error) {
        console.error(`Error fetching forum: ${error}`);
        res.status(500).send('Internal server error');
    }
};
