const route = require('express').Router();
const {
    createProject,
    getProjectById,
    getProjectByQuery,
    updateProject,
    deleteProject,
    getProjectByUserId,
} = require('../controllers/projectController');
const { checkBodyParameter, checkProjectId } = require('../middlewares/projectMiddleware');

route.post('/', checkBodyParameter, createProject);

route.get('/', getProjectByUserId);

route.get('/search', getProjectByQuery);

// OK
route.get('/:projectId', checkProjectId, getProjectById);

route.put('/:projectId', checkProjectId, checkBodyParameter, updateProject);

// route.put('/:projectId/user', checkProjectId, updateProjectMember);
route.delete('/:projectId', checkProjectId, deleteProject);

module.exports = route;
