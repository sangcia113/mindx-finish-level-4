const {
    createAssessment,
    getAssessmentById,
    updateAssessment,
    deleteAssessment,
    getAssessmentByQuery,
} = require('../services/assessmentService');

const assessmentController = {
    createAssessment: async (req, res) => {
        const assessmentData = req.body;
        try {
            await createAssessment(assessmentData);
            res.status(200).json({ err: 0, msg: 'Add successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAssessmentById: async (req, res) => {
        const { assessmentId } = req.params;
        try {
            const results = await getAssessmentById(assessmentId);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAssessmentByQuery: async (req, res) => {
        const { stageId, userId } = req.query;
        const query = {};
        if (stageId) query.stageId = stageId;
        if (userId) query.userId = userId;
        try {
            const results = await getAssessmentByQuery(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateAssessment: async (req, res) => {
        const { assessmentId } = req.params;
        const assessmentData = req.body;
        try {
            await updateAssessment(assessmentId, assessmentData);
            res.status(200).json({ err: 0, msg: 'Update successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteAssessment: async (req, res) => {
        const { assessmentId } = req.params;
        try {
            await deleteAssessment(assessmentId);
            res.status(200).json({ err: 0, msg: 'Delete successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = assessmentController;
