const route = require('express').Router();
const {
    createProject,
    getProjectById,
    getProjectByQuery,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
const { checkBodyParameter, checkProjectId } = require('../middlewares/projectMiddleware');
route.post('/', checkBodyParameter, createProject);
route.get('/search', getProjectByQuery);
route.get('/:projectId', checkProjectId, getProjectById);
route.put('/:projectId', checkProjectId, checkBodyParameter, updateProject);
route.delete('/:projectId', checkProjectId, deleteProject);
module.exports = route;
