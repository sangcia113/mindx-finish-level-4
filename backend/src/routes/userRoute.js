const route = require('express').Router();
const { getUserById, updateUser } = require('../controllers/userController');
const { checkBodyParameter } = require('../middlewares/userMiddleware');

route.get('/', getUserById);

route.put('/', checkBodyParameter, updateUser);

module.exports = route;
