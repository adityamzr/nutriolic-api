const express = require('express');
const router = express.Router();
const controller = require('../controllers/gameController');
const authMiddleware = require('../middlewares/authMiddleware');

router.put('/game', authMiddleware, controller.upsertGame);

module.exports = router;