const route = require('express').Router();
const { checkSignParameter } = require('../middlewares/authMiddleware');
const { checkSignIn } = require('../controllers/signInController');
route.post('/', checkSignParameter, checkSignIn);

module.exports = route;
