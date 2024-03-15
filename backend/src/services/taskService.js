const Task = require('../models/taskModel');
const taskService = {
    createTask: async taskData => await new Task(taskData).save(),
    getAllTask: async () => await Task.find(),
    getTaskById: async taskId => await Task.findById(taskId),
    getTaskByStageId: async stageId => await Task.findOne({ stageId }),
    updateTask: async (taskId, taskData) => await Task.findByIdAndUpdate(taskId, taskData),
    deleteTask: async taskId => await Task.findByIdAndDelete(taskId),
};
module.exports = taskService;
