const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();


router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/forgetpassword', authController.forgetPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
router.patch('/updatepassword/:id', authController.updatePassword);

module.exports = router;
