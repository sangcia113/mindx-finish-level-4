const route = require('express').Router();
const {
    createAssessment,
    getAssessmentById,
    updateAssessment,
    deleteAssessment,
    getAssessmentByQuery,
} = require('../controllers/assessmentController');
const { checkBodyParameter, checkAssessmentId } = require('../middlewares/assessmentMiddleware');
route.post('/', checkBodyParameter, createAssessment);
route.get('/search', getAssessmentByQuery);
route.get('/:assessmentId', checkAssessmentId, getAssessmentById);
route.put('/:assessmentId', checkAssessmentId, checkBodyParameter, updateAssessment);
route.delete('/:assessmentId', checkAssessmentId, deleteAssessment);
module.exports = route;
