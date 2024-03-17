const route = require('express').Router();
const {
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { checkUserId, checkBodyParameter } = require('../middlewares/userMiddleware');
route.get('/all', getAllUser);
route.get('/:userId', checkUserId, getUserById);
route.put('/:userId', checkUserId, checkBodyParameter, updateUser);
route.delete('/:userId', checkUserId, deleteUser);
module.exports = route;
