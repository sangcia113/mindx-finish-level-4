const Stage = require('../models/stageModel');
const stageService = {
    createStage: async stageData => await new Stage(stageData).save(),
    getAllStage: async () => await Stage.find(),
    getStageById: async stageId => await Stage.findById(stageId),
    getStageByProjectId: async projectId => await Stage.findOne({ projectId }),
    updateStage: async (stageId, stageData) => await Stage.findByIdAndUpdate(stageId, stageData),
    deleteStage: async stageId => await Stage.findByIdAndDelete(stageId),
};
module.exports = stageService;
