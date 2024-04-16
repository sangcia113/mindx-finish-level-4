const mongoose = require('mongoose');
const { USER_ROLE } = require('../constants');
const UserProjectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    role: {
        type: String,
        required: true,
        enum: USER_ROLE,
    },
    dateOfJoin: { type: Date, default: Date.now() },
    createdDate: { type: Date, default: Date.now() },
});
const UserProject = mongoose.model('UserProject', UserProjectSchema);
module.exports = UserProject;
