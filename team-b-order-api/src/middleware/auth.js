import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        // Inconsistent error format
        return res.status(401).json('Authentication failed');
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key');
      req.userData = decoded;
      next();
    } catch (error) {
      // Generic error for all auth issues
      return res.status(500).json({ message: 'Authentication failed' });
    }
  };