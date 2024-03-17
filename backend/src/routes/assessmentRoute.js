const route = require('express').Router();
const {
    createAssessment,
    getAllAssessment,
    getAssessmentById,
    getAssessmentByStageId,
    getAssessmentByUserId,
    updateAssessment,
    deleteAssessment,
} = require('../controllers/assessmentController');
const {
    checkBodyParameter,
    checkAssessmentId,
    checkStageId,
    checkUserId,
} = require('../middlewares/assessmentMiddleware');
route.post('/', checkBodyParameter, createAssessment);
route.get('/all', getAllAssessment);
route.get('/:assessmentId', checkAssessmentId, getAssessmentById);
route.get('/stage/:stageId', checkStageId, getAssessmentByStageId);
route.get('/user/:userId', checkUserId, getAssessmentByUserId);
route.put('/:assessmentId', checkAssessmentId, checkBodyParameter, updateAssessment);
route.delete('/:assessmentId', checkAssessmentId, deleteAssessment);
module.exports = route;
