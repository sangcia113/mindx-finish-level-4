const route = require('express').Router();
const { checkSignParameter } = require('../middlewares/authMiddleware');
const { checkSignUp } = require('../controllers/signUpController');
route.post('/', checkSignParameter, checkSignUp);
module.exports = route;
