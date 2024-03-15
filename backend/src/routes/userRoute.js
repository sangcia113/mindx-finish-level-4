const route = require('express').Router();
const {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { checkParams, checkBody } = require('../middlewares/userMiddleware');
route.post('/', createUser);
route.get('/all', getAllUser);
route.get('/:id', checkParams, getUserById);
route.put('/:id', checkParams, checkBody, updateUser);
route.delete('/:id', checkParams, deleteUser);
module.exports = route;
