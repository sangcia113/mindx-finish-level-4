const {
    createTaskUser,
    getTaskUserById,
    updateTaskUser,
    getUserNotInTask,
    getTaskUserByQuery,
    deleteTaskUser,
} = require('../controllers/taskUserController');

const route = require('express').Router();

// ok
route.post('/', createTaskUser);

// ok
route.get('/search', getTaskUserByQuery);

// ok
route.get('/not-in-task/:taskId', getUserNotInTask);

route.get('/:taskId', getTaskUserById);

route.put('/:taskUserId', updateTaskUser);

// ok
route.delete('/:taskUserId', deleteTaskUser);

module.exports = route;
