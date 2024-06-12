const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
// const upload = require('./upload');


// Route Includes
const userRouter = require('./routes/user.router');
const treesRouter = require('./routes/myTrees.router');
const statusesRouter = require('./routes/status.router')
const tree_activityRouter = require('./routes/tree_activity.router')
// const upload = require()

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/trees', treesRouter);
app.use('/api/statuses', statusesRouter);
app.use('/api/tree_activity', tree_activityRouter)
// app.use('api/upload', uploadRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
