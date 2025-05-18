const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/users', authMiddleware, controller.getUser);
router.get('/users/:id', authMiddleware, controller.getUserDetail);

module.exports = router;