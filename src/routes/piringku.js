const express = require('express');
const router = express.Router();
const controller = require('../controllers/piringkuController');
const authMiddleware = require('../middlewares/authMiddleware');

router.put('/piringku-responses', authMiddleware, controller.upsertPiringkuResponse);

module.exports = router;