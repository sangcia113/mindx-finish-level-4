const route = require('express').Router();
const {
    createTask,
    getAllTask,
    getTaskById,
    getTaskByStageId,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const { checkBodyParameter, checkTaskId, checkStageId } = require('../middlewares/taskMiddleware');
route.post('/', checkBodyParameter, createTask);
route.get('/all', getAllTask);
route.get('/:taskId', checkTaskId, getTaskById);
route.get('/stage/:stageId', checkStageId, getTaskByStageId);
route.put('/:taskId', checkTaskId, checkBodyParameter, updateTask);
route.delete('/:taskId', checkTaskId, deleteTask);
module.exports = route;
