const mongoose = require('mongoose');
const { STATUS_PROJECT, USER_ROLE } = require('../constants');
const ProjectSchema = new mongoose.Schema({
    projectCode: { type: String, required: true, unique: true },
    projectName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: STATUS_PROJECT,
        default: 'Preparing',
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // members: [
    //     {
    //         member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //         role: {
    //             type: String,
    //             required: true,
    //             enum: USER_ROLE,
    //         },
    //         joinDate: { type: Date, default: Date.now() },
    //         createdDate: { type: Date, default: Date.now() },
    //     },
    // ],
    createdDate: { type: Date, default: Date.now() },
});
const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
