const Stage = require('../models/stageModel');
const stageService = {
    createStage: async stageData => await new Stage(stageData).save(),
    getStageById: async stageId => await Stage.findById(stageId),
    getStageByQuery: async query => await Stage.find(query),
    updateStage: async (stageId, stageData) => await Stage.findByIdAndUpdate(stageId, stageData),
    deleteStage: async stageId => await Stage.findByIdAndDelete(stageId),
};
module.exports = stageService;
