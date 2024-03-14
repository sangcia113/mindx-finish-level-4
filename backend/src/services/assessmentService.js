const Assessment = require('../models/assessmentModel');
const assessmentService = {
    createAssessment: async assessmentData => await new Assessment(assessmentData).save(),
    getAllAssessment: async () => await Assessment.find(),
    getAssessmentById: async assessmentId => await Assessment.findById(assessmentId),
    getAssessmentByStageId: async stageId => await Assessment.findOne({ stageId }),
    getAssessmentByUserId: async userId => await Assessment.findOne({ userId }),
    updateAssessment: async (assessmentId, assessmentData) =>
        Assessment.findByIdAndUpdate(assessmentId, assessmentData),
    deleteAssessment: async assessmentId => await Assessment.findByIdAndDelete(assessmentId),
};
module.exports = assessmentService;
