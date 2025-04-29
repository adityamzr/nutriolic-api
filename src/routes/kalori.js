const express = require('express');
const router = express.Router();
const controller = require('../controllers/kaloriController');
const authMiddleware = require('../middlewares/authMiddleware');

router.put('/kalori-responses', authMiddleware, controller.upsertKaloriResponse);

module.exports = router;