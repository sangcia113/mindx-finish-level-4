const mongoose = require('mongoose');
const StageSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    stageName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    dueDate: { type: Date, default: null },
    // evaluations: [
    //     {
    //         content: { type: String, required: true },
    //         evaluator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //         createdDate: { type: Date, default: Date.now() },
    //     },
    // ],
    createdDate: { type: Date, default: Date.now() },
});
const Stage = mongoose.model('Stage', StageSchema);
module.exports = Stage;
