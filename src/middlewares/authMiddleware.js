const jwt = require('../utils/jwt');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verifyToken(token);
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};