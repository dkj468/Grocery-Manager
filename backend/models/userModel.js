const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide a user name'],
  },
  email: {
    type: String,
    required: [true, 'please provide a valid email id'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'password did not match',
    },
  },
  passwordChangedAt:{
    type: Date
  },
  passwordResetToken:{
    type: String
  },
  passwordResetExpire:{
    type: Date
  }
});

// add password hash functionality
userSchema.pre('save', async function(next){
  if (!this.isModified('password')) { return next(); }
  this.password = await bcryptjs.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified || this.isNew) {return next()};
  this.passwordChangedAT = Date.now() - 1000;
  next();
});

userSchema.methods.isCorrectPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){
  if(this.passwordChangedAt){
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return (changedTimeStamp > JWTTimeStamp);
  }
};

userSchema.methods.createResetToken = async function(){
  const resetToken = await crypto.randomBytes(20).toString('hex');
  this.passwordResetToken = await crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
}

const User = mongoose.model('User', userSchema);
module.exports = User;
