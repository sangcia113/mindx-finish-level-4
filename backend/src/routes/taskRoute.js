const route = require('express').Router();
const {
    createTask,
    getAllTask,
    getTaskById,
    getTaskByStageId,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
route.post('/', createTask);
route.get('/all', getAllTask);
route.get('/:id', getTaskById);
route.get('/stage/:id', getTaskByStageId);
route.put('/:id', updateTask);
route.delete('/:id', deleteTask);
module.exports = route;
