const { check } = require('express-validator');

const registerValidation = [
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password','Please enter a password with 6 or more characters').isLength({ min: 6 })
]

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
]

module.exports = {
  registerValidation,
  loginValidation
}
