const Task = require('../models/taskModel');
const taskService = {
    createTask: async taskData => await new Task(taskData).save(),
    getTaskById: async taskId => await Task.findById(taskId),
    getTaskByQuery: async query => await Task.find(query),
    updateTask: async (taskId, taskData) => await Task.findByIdAndUpdate(taskId, taskData),
    deleteTask: async taskId => await Task.findByIdAndDelete(taskId),
};
module.exports = taskService;
