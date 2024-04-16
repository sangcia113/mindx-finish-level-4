const mongoose = require('mongoose');
const { TASK_PRIORITY, TASK_TYPE, TASK_STATUS } = require('../constants');
const TaskSchema = new mongoose.Schema({
    stageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stage', required: true },
    taskCode: { type: String, required: true, unique: true },
    taskName: { type: String, required: true },
    taskType: { type: String, required: true, enum: TASK_TYPE },
    priority: {
        type: String,
        required: true,
        enum: TASK_PRIORITY,
    },
    startDate: { type: Date, required: true },
    deadline: { type: Date, required: true },
    dueDate: { type: Date, default: null },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: TASK_STATUS,
        default: 'Open',
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdDate: { type: Date, default: Date.now() },
});
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
