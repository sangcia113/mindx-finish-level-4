const route = require('express').Router();
const {
    createTask,
    getTaskById,
    getTaskByQuery,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const { checkBodyParameter, checkTaskId } = require('../middlewares/taskMiddleware');
route.post('/', checkBodyParameter, createTask);
route.get('/search', getTaskByQuery);
route.get('/:taskId', checkTaskId, getTaskById);
route.put('/:taskId', checkTaskId, checkBodyParameter, updateTask);
route.delete('/:taskId', checkTaskId, deleteTask);
module.exports = route;
