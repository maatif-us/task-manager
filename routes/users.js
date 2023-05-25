const express = require('express');
const userRouter = express.Router();
const verifyToken = require('../middleware/auth');

const { getUser, getUsers } = require('../controllers/users');
const { signUp, login } = require('../controllers/auth');
const validateResult = require('../middleware/validateResult');
const { registerValidation, loginValidation } = require('../middleware/authValidation');

userRouter
  .route('/')
  .get(verifyToken, getUser)
  .post(registerValidation, validateResult, signUp)

userRouter
  .route('/login')
  .post(loginValidation, validateResult, login)

userRouter
  .route('/all')
  .get( verifyToken, getUsers)


module.exports = userRouter;
