const { body } = require('express-validator');

const registrationValidation = [
  body('fname').notEmpty().withMessage('First name is required'),
  body('lname').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('address').notEmpty().withMessage('Address is required'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = { registrationValidation, loginValidation };
