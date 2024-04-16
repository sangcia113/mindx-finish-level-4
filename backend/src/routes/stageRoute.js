const route = require('express').Router();
const {
    createStage,
    getStageById,
    getStageByQuery,
    updateStage,
    deleteStage,
} = require('../controllers/stageController');
const { checkBodyParameter, checkStageId } = require('../middlewares/stageMiddleware');

// ok
route.post('/', checkBodyParameter, createStage);

// ok
route.get('/search', getStageByQuery);

route.get('/:stageId', checkStageId, getStageById);
route.put('/:stageId', checkStageId, updateStage);
route.delete('/:stageId', checkStageId, deleteStage);
module.exports = route;
