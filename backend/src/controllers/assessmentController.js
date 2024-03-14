const {
    createAssessment,
    getAllAssessment,
    getAssessmentById,
    getAssessmentByStageId,
    getAssessmentByUserId,
    updateAssessment,
    deleteAssessment,
} = require('../services/assessmentService');

const assessmentController = {
    createAssessment: async (req, res) => {
        try {
            const assessmentData = req.body;
            await createAssessment(assessmentData);
            res.status(201).json({ err: 0, msg: 'Insert assessment successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAllAssessment: async (req, res) => {
        try {
            const results = await getAllAssessment();
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAssessmentById: async (req, res) => {
        try {
            const { assessmentId } = req.params;
            const results = await getAssessmentById(assessmentId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAssessmentByStageId: async (req, res) => {
        try {
            const { stageId } = req.params;
            const results = await getAssessmentByStageId(stageId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAssessmentByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const results = await getAssessmentByUserId(userId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateAssessment: async (req, res) => {
        try {
            const { assessmentId } = req.params;
            const assessmentData = req.body;
            await updateAssessment(assessmentId, assessmentData);
            res.status(201).json({ err: 0, msg: 'Update assessment successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteAssessment: async (req, res) => {
        try {
            const { assessmentId } = req.params;
            await deleteAssessment(assessmentId);
            res.status(201).json({ err: 0, msg: 'Delete assessment successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = assessmentController;
