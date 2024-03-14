const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    stageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stage', require: true },
    code: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    type: { type: String, require: true, enum: ['Mission', 'Problem'] },
    priority: { type: String, require: true, enum: ['Highest', 'High', 'Medium', 'Low', 'Lowest'] },
    startDate: { type: Date, require: true },
    deadline: { type: Date, require: true },
    dueDate: { type: Date, require: true },
    description: { type: String, require: true },
    status: { type: String, require: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    createdDate: { type: Date, require: true, default: Date.now() },
});
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
