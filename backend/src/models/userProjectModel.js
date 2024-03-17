const mongoose = require('mongoose');
const UserProjectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', require: true },
    role: {
        type: String,
        require: true,
        enum: ['Project Owner', 'Project Manager', 'Regular Member', 'Project Supervisor'],
    },
    dateOfJoin: { type: Date, require: true },
    createdDate: { type: Date, require: true, default: Date.now() },
});
const UserProject = mongoose.model('UserProject', UserProjectSchema);
module.exports = UserProject;
