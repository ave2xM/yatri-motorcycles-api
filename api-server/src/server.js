const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');
const socketIO = require('./utils/socket');

// Global error handling for uncaught exception (bugs) - Sychronous
process.on('uncaughtException', err => {
  console.log('UNHANDLED EXCEPTION 💥 SHUTTING DOWN...');
  console.log(err.name, err.message);

  // When there is an uncaught exception, we need to crash our application
  // Cause after there is an uncaught exception, the entire node process is in "unclean" state
  // So cause of that the process needs to be terminated and restart
  process.exit(1);
});

mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('✅ DB connection successful'));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});

// Global promise rejection handler
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION 💥 SHUTTING DOWN...');

  server.close(() => {
    process.exit(1);
  });
});

// initializing the socket instance
socketIO.initialize(server);
