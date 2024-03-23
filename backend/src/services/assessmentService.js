const Assessment = require('../models/assessmentModel');
const assessmentService = {
    createAssessment: async assessmentData => await new Assessment(assessmentData).save(),
    getAssessmentById: async assessmentId => await Assessment.findById(assessmentId),
    getAssessmentByQuery: async query => await Assessment.find(query),
    updateAssessment: async (assessmentId, assessmentData) =>
        Assessment.findByIdAndUpdate(assessmentId, assessmentData),
    deleteAssessment: async assessmentId => await Assessment.findByIdAndDelete(assessmentId),
};
module.exports = assessmentService;
