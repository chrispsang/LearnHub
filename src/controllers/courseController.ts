// src/controllers/courseController.ts
import { Request, Response } from 'express';
import Course from '../models/Course';
import { Op } from 'sequelize';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Failed to retrieve courses', error });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Failed to retrieve course', error });
  }
};

export const searchCourses = async (req: Request, res: Response) => {
  const { search } = req.query;
  console.log('Search query:', search);  // Add this line

  try {
    const courses = await Course.findAll({
      where: {
        title: {
          [Op.iLike]: `%${search}%`
        }
      }
    });

    res.json(courses);
  } catch (error) {
    console.error('Error searching for courses:', error);
    res.status(500).json({ message: 'Failed to search for courses', error });
  }
};
