const express = require('express');
const router = express.Router();
const controller = require('../controllers/giziController');
const authMiddleware = require('../middlewares/authMiddleware');

router.put('/gizi-responses', authMiddleware, controller.upsertGiziResponse);

module.exports = router;