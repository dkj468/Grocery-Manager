const express = require('express');

const itemRouter = require('./router/itemRoute');

const app = express();

// body parser
app.use(express.json({ limit: '10kb' }));

// CORS header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH,DELETE, OPTIONS');
  next();
})

app.get('/', (req, res, next) => {
  res.status(200).send('Response from Node Backend Server');
});

app.use('/api/v1/item', itemRouter);

module.exports = app;


