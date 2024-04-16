const route = require('express').Router();
const {
    createTask,
    getTaskById,
    getTaskByQuery,
    updateTask,
    deleteTask,
    updateTaskStatus,
} = require('../controllers/taskController');
const { checkBodyParameter, checkTaskId } = require('../middlewares/taskMiddleware');

// ok
route.post('/', createTask);

// ok
route.get('/search', getTaskByQuery);

// ok
route.get('/:taskId', checkTaskId, getTaskById);

// ok
route.put('/:taskId', checkTaskId, updateTask);

// ok
route.put('/status/:taskId', updateTaskStatus);

// ok
route.delete('/:taskId', checkTaskId, deleteTask);

module.exports = route;
