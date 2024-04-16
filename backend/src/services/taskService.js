const Task = require('../models/taskModel');
const taskService = {
    // ok
    createTask: async taskData => await new Task(taskData).save(),

    // ok
    getTaskById: async taskId =>
        await Task.findById(taskId)
            .populate('createdBy', 'fullName')
            .populate('stageId', 'stageName'),

    // ok
    getTaskByQuery: async query => await Task.find(query).populate('createdBy', 'fullName'),

    // ok
    updateTask: async (taskId, taskData) => await Task.findByIdAndUpdate(taskId, taskData),

    // ok
    updateTaskStatus: async (taskId, status) => await Task.findByIdAndUpdate(taskId, { status }),

    deleteTask: async taskId => await Task.findByIdAndDelete(taskId),
};
module.exports = taskService;
