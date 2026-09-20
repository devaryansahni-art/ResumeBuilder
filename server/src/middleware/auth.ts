import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Authentication token required' });
    return;
  }

  const secret = process.env.JWT_SECRET || 'super-secret-craftcv-jwt-token-key-2026';

  jwt.verify(token, secret, (err, decoded) => {
    if (err || !decoded) {
      res.status(403).json({ error: 'Invalid or expired token' });
      return;
    }

    req.user = decoded as { userId: string; email: string };
    next();
  });
};
