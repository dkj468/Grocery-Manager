/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = err => {
  const value = err.errmsg.match(/"(.*?)"/g)[0];
  const message = `duplicate field value - ${value}. Please provide another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const values = Object.values(err.errors).map(el => el.message);
  const message = `invalid input data : ${values.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTerror = () =>
  new AppError('invalid token, please login again', 401);

const handleJWTexpireError = () =>
  new AppError('Token has expired, please login again', 401);

const sendProductionErrors = (req, res, err) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      // operational or trusetd error - send message to client
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
      // any unknown error like programming error etc
    }
    // 1. log error
    console.error('ERROR', err);
    //2. send a generic message
    res.status(500).json({
      status: 'Error',
      message: 'Something went wrong'
    });
  }
  if (err.isOperational) {
    // operational or trusetd error - send message to client
    return res.status(err.statusCode).render('error', {
      title: 'error',
      msg: err.message
    });
    // any unknown error like programming error etc
  }
  // 1. log error
  console.error('ERROR 💥', err);
  //2. send a generic message
  res.status(500).render('error', {
    title: 'error',
    msg: 'Something went wrong! Please try again'
  });
};

const sendDevelopmentErrors = (req, res, err) => {
  // A - API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  }

  // B - RENDERED WEBSITE
  console.error('ERROR 💥', err);
  res.status(err.statusCode).render('error', {
    title: 'error',
    msg: err.message
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevelopmentErrors(req, res, err);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') { error = handleCastErrorDB(error); }
    if (error.code === 11000) { error = handleDuplicateErrorDB(error); }
    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') { error = handleJWTerror(); }
    if (error.name === 'TokenExpiredError') { error = handleJWTexpireError(); }

    sendProductionErrors(req, res, error);
  }
};
