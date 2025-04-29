const jwt = require('jsonwebtoken');
const SECRET_KEY = 'rahasia123';

exports.signToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
exports.verifyToken = (token) => jwt.verify(token, SECRET_KEY);