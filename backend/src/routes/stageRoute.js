const route = require('express').Router();
const {
    createStage,
    getAllStage,
    getStageById,
    getStageByProjectId,
    updateStage,
    deleteStage,
} = require('../controllers/stageController');
const {
    checkBodyParameter,
    checkStageId,
    checkProjectId,
} = require('../middlewares/stageMiddleware');
route.post('/', checkBodyParameter, createStage);
route.get('/all', getAllStage);
route.get('/:stageId', checkStageId, getStageById);
route.get('/project/:projectId', checkProjectId, getStageByProjectId);
route.put('/:stageId', checkStageId, checkBodyParameter, updateStage);
route.delete('/:stageId', checkStageId, deleteStage);
module.exports = route;
