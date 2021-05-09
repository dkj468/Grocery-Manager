const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./backend/app');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

const conString = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

mongoose.connect(conString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection
  .on('open', () => {
    console.log('mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Error connecting to database : ${err}`);
  });

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

// unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
