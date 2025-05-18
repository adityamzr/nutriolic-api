const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const onboardingRoutes = require('./routes/onboarding');
const nutrisiRoutes = require('./routes/nutrisi');
const kaloriRoutes = require('./routes/kalori');
const giziRoutes = require('./routes/gizi');
const piringkuRoutes = require('./routes/piringku');
const quiz = require('./routes/quiz');
const game = require('./routes/game');
const reflection = require('./routes/reflection');
const users = require('./routes/users')

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', onboardingRoutes);
app.use('/api', nutrisiRoutes);
app.use('/api', kaloriRoutes);
app.use('/api', giziRoutes);
app.use('/api', piringkuRoutes);
app.use('/api', quiz);
app.use('/api', game);
app.use('/api', reflection);
app.use('/api', users);

module.exports = app;