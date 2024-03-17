const route = require('express').Router();
const { checkSignUp } = require('../controllers/signUpController');
const { checkSignUpParameter } = require('../middlewares/authMiddleware');
route.post('/', checkSignUpParameter, checkSignUp);
module.exports = route;
