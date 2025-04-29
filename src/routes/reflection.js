const express = require('express');
const router = express.Router();
const controller = require('../controllers/reflectionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.put('/reflection', authMiddleware, controller.upsertReflection);

module.exports = router;