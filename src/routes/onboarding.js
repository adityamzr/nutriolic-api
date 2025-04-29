const express = require('express');
const router = express.Router();
const controller = require('../controllers/onboardingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.put('/onboarding', authMiddleware, controller.upsertOnboarding);

module.exports = router;