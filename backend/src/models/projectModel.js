const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
    code: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
    dueDate: { type: Date, require: true },
    description: { type: String, default: null },
    status: {
        type: String,
        require: true,
        enum: ['Open', 'In Progress', 'In Review', 'Done', 'Re-Open', 'Cancel'],
    },
    createdDate: { type: Date, require: true, default: Date.now() },
});
const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
