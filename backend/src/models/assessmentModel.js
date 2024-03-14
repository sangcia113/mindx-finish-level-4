const mongoose = require('mongoose');
const AssessmentSchema = new mongoose.Schema({
    stageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stage', require: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    content: { type: String, require: true },
    createdDate: { type: Date, require: true, default: Date.now() },
});
const Assessment = mongoose.model('Assessment', AssessmentSchema);
module.exports = Assessment;
