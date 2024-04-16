const mongoose = require('mongoose');
const AssessmentSchema = new mongoose.Schema({
    stageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stage', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdDate: { type: Date, default: Date.now() },
});
const Assessment = mongoose.model('Assessment', AssessmentSchema);
module.exports = Assessment;
