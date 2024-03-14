const mongoose = require('mongoose');
const StageSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', require: true },
    name: { type: String, require: true, unique: true },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
    dueDate: { type: Date, require: true },
    createdDate: { type: Date, require: true, default: Date.now() },
});
const Stage = mongoose.model('Stage', StageSchema);
module.exports = Stage;
