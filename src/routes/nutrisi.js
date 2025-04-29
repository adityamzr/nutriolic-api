const express = require('express');
const router = express.Router();
const controller = require('../controllers/nutrisiController');
const authMiddleware = require('../middlewares/authMiddleware');

router.put('/nutrisi-responses', authMiddleware, controller.upsertNutrisiResponse);

module.exports = router;