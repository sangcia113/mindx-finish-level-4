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
route.post('/', createAssessment);
route.get('/all', getAllAssessment);
route.get('/:id', getAssessmentById);
route.get('/stage/:id', getAssessmentByStageId);
route.get('/user/:id', getAssessmentByUserId);
route.put('/:id', updateAssessment);
route.delete('/:id', deleteAssessment);
module.exports = route;
