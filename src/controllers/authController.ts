// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Helper function to generate JWT token
function generateToken(userId: number, username: string) {
  const payload = { userId, username};
  const secret = process.env.JWT_SECRET || 'default_secret'; // Use env variable or fallback
  const options = { expiresIn: '1h' }; // Token expires in 1 hour
  return jwt.sign(payload, secret, options);
}

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

    // Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Generate JWT token for user
    const token = generateToken(newUser.id, newUser.username);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT token for user
    const token = generateToken(user.id, user.username);

    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Failed to log in', error });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Failed to logout user', error });
  }
};