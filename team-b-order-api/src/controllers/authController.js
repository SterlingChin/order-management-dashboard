import jwt from 'jsonwebtoken';

// Problematic implementation with hardcoded credentials and minimal validation
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hardcoded credentials - obviously problematic
    if (username === 'admin' && password === 'password') {
      const token = jwt.sign(
        { username },
        process.env.JWT_SECRET || 'default-secret-key',
        { expiresIn: '1h' }
      );

      // Send token in response body - not following best practices
      res.json({ token });
    } else {
      // Inconsistent error format
      res.status(401).json('Invalid credentials');
    }
  } catch (error) {
    // Generic error with no details
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      // Another inconsistent error format
      return res.status(400).send('Token is required');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key');
      const newToken = jwt.sign(
        { username: decoded.username },
        process.env.JWT_SECRET || 'default-secret-key',
        { expiresIn: '1h' }
      );

      res.json({ token: newToken });
    } catch (error) {
      // Yet another inconsistent error format
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    // Generic error
    res.status(500).json({ message: 'Internal server error' });
  }
};