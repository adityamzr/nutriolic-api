const express = require('express');
const router = express.Router();
const controller = require('../controllers/quizController');
const authMiddleware = require('../middlewares/authMiddleware');

router.put('/quiz', authMiddleware, controller.upsertQuiz);

module.exports = router;