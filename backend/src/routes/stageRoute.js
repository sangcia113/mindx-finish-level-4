const route = require('express').Router();
const {
    createStage,
    getAllStage,
    getStageById,
    getStageByProjectId,
    updateStage,
    deleteStage,
} = require('../controllers/stageController');
route.post('/', createStage);
route.get('/all', getAllStage);
route.get('/:id', getStageById);
route.get('/project/:id', getStageByProjectId);
route.put('/:id', updateStage);
route.delete('/:id', deleteStage);
module.exports = route;
