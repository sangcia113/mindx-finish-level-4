const {
    createStage,
    getStageById,
    getStageByQuery,
    updateStage,
    deleteStage,
} = require('../services/stageService');
const stageController = {
    // ok
    createStage: async (req, res) => {
        const stageData = req.body;

        try {
            await createStage(stageData);

            res.status(200).json({ err: 0, msg: 'Add successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getStageById: async (req, res) => {
        const { stageId } = req.params;
        try {
            const results = await getStageById(stageId);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getStageByQuery: async (req, res) => {
        const { projectId, name, startDate, endDate, dueDate } = req.query;
        const query = {};
        if (projectId) query.projectId = projectId;
        if (name) query.name = name;
        if (startDate) query.startDate = { $gte: new Date(startDate) };
        if (endDate) query.endDate = { $lte: new Date(endDate) };
        if (dueDate) query.dueDate = { $lte: new Date(dueDate) };
        try {
            const results = await getStageByQuery(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateStage: async (req, res) => {
        const { stageId } = req.params;
        const stageData = req.body;
        try {
            await updateStage(stageId, stageData);
            res.status(200).json({ err: 0, msg: 'Update successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteStage: async (req, res) => {
        try {
            const { stageId } = req.params;
            await deleteStage(stageId);
            res.status(200).json({ err: 0, msg: 'Delete successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = stageController;
