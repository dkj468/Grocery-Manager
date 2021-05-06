const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./backend/app');

dotenv.config({path:'./config.env'});

const conString = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(conString, {
  useUnifiedTopology:true,
  useNewUrlParser:true
});

mongoose.connection
  .on('open', () => {
    console.log('mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Error connecting to database : ${err}`)
  });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
})
