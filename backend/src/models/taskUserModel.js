const mongoose = require('mongoose');
const taskUserSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdDate: { type: Date, default: Date.now() },
});
const TaskUser = mongoose.model('TaskUser', taskUserSchema);
module.exports = TaskUser;
