const {
    createStage,
    getAllStage,
    getStageById,
    getStageByProjectId,
    updateStage,
    deleteStage,
} = require('../services/stageService');
const stageController = {
    createStage: async (req, res) => {
        try {
            const stageData = req.body;
            await createStage(stageData);
            res.status(201).json({ err: 0, msg: 'Insert stage successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAllStage: async (req, res) => {
        try {
            const results = await getAllStage();
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getStageById: async (req, res) => {
        try {
            const { stageId } = req.params;
            const results = await getStageById(stageId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getStageByProjectId: async (req, res) => {
        try {
            const { projectId } = req.params;
            const results = await getStageByProjectId(projectId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateStage: async (req, res) => {
        try {
            const { stageId } = req.params;
            const stageData = req.body;
            await updateStage(stageId, stageData);
            res.status(201).json({ err: 0, msg: 'Update stage successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteStage: async (req, res) => {
        try {
            const { stageId } = req.params;
            await deleteStage(stageId);
            res.status(201).json({ err: 0, msg: 'Delete stage successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = stageController;
