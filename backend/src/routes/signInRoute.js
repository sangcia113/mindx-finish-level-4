const route = require('express').Router();
const { checkSignIn } = require('../controllers/signInController');
const { checkSignInParameter } = require('../middlewares/authMiddleware');
route.post('/', checkSignInParameter, checkSignIn);
module.exports = route;
