const {promisify} = require('util');
const crypto= require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsyncError');
const sendEmail = require('../utils/email');

const getToken = async (userId) => {
  return await jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}

exports.signUp = catchAsync(async (req, res, next) => {
  // console.log(req.body);

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  newUser.password = undefined;
  const token = await getToken(newUser._id);
  res.status(201).json({
    status:'success',
    token,
    data: newUser
  });
});


exports.login = catchAsync(async (req, res, next) => {
  // 1. check for user email and password in request body
  const {email , password} = req.body;
  if(!email || !password){
    return next(new AppError('Please provide email and password', 400));
  }
  // 2. check if user exists and password is valid
  const user = await User.findOne({email}).select('+password');

  if(!user || !await user.isCorrectPassword(password, user.password)){
    return next(new AppError('Invalid email or password', 401));
  }

  // console.log(user);
  // 3. create a new token
  const token = await getToken(user._id);
  // 4. send the response
  res.status(200).json({
    status:'success',
    token
  })
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1. check if req contains the token in header
  if(!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
    return next(new AppError('token is not available in request header', 401));
  };

  const token = req.headers.authorization.split(' ')[1];

  // 2. check if token is valid
  const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. check if user still exists
  const currentUser = await User.findById(decodedToken.id);
  if(!currentUser){
    return next(new AppError('User belongs to this token does not exists', 401));
  }

  // 4. check if user hasn't changed the password after token was issued
  if(currentUser.changedPasswordAfter(decodedToken.iat)){
    return next(new AppError('user recently has changed password. Please login again', 401));
  }

  req.user = currentUser;
  next();
});

exports.forgetPassword = catchAsync(async (req, res, next) =>{
  // 1. check if user exists with given email id in DB
  const user = await User.findOne({email: req.body.email});
  if (!user){
    return next(new AppError('No user found with this email. Please provide a valid email id', 401));
  }

  // 2. create a reset token
  const resetToken = await user.createResetToken();
  await user.save({validateBeforeSave: false});

  //3. send the reset token in email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/user/resetpassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your password and passwordConfirm to : ${resetURL}.
                    \n If you did not forget your password , please ignore this email`;
  try {
    await sendEmail({
      to: user.email,
      subject: 'your password reset token(valid for 10 minutes)',
      text: message
    });

    res.status(200).json({
      status: 'success',
      message: 'token sent to email'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    return next(new AppError('error sending email', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. get user based on password reset token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpire:{$gt: Date.now()}});

  // 2. if token is valid and not expired , set the new password for user
  if(!user){
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  await user.save();

  // 3. reset the passwordChangedAt for the user
  // this has been done at model level

  // get the new token and send the response
  const token = await getToken(user._id);
  res.status(200).json({
    status:'success',
    token
  })
});

// Update the password -- assumption is that user will be logged in
// already, so logged in user's id will be passed in request.
// Request will also have current password of the user to verify
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get the user based on user id present in request params
  const user = await User.findById(req.params.id).select('+password');
  if (!user){
    return next(new AppError('User does not exist', 400));
  }
  // 2. check if current password is a valid one
  if(!await user.isCorrectPassword(req.body.currentPassword, user.password)){
    return next(new AppError('Invalid current password', 401));
  }
  // update the user's password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newConfirmPassword;
  await user.save();
  // send the new token and response to user
  const token = await getToken();
  res.status(200).json({
    status:'success',
    token
  });
});
