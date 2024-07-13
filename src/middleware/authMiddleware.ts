// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
  user?: { userId: number }; 
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Check for token in headers
  const token = req.headers.authorization?.split(' ')[1]; // Assuming "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: number }; // Use environment variable for secret

    // Attach user info to request object
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};
