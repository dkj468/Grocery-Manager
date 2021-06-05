const express = require('express');

const itemRouter = require('./router/itemRoute');
const previousItemRouter = require('./router/previousItemRouter');
const userRouter = require('./router/userRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

// body parser
app.use(express.json({ limit: '10kb' }));

// CORS header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH,DELETE, OPTIONS');
  next();
})

app.get('/', (req, res, next) => {
  res.status(200).send('Response from Node Backend Server');
});

app.use('/api/v1/item', itemRouter);
app.use('/api/v1/previousItem', previousItemRouter);
app.use('/api/v1/user', userRouter);

// Unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`,404));
});


// Global error handler
// ERROR first middleware
app.use(globalErrorHandler);

module.exports = app;


