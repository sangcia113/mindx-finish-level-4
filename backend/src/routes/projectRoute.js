const route = require('express').Router();
const {
    getAllProject,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
const { checkBodyParameter, checkProjectId } = require('../middlewares/projectMiddleware');
route.post('/', checkBodyParameter, createProject);
route.get('/all', getAllProject);
// bo sung tim kiem theo ten/ status ...
route.get('/:projectId', checkProjectId, getProjectById);
route.put('/:projectId', checkProjectId, checkBodyParameter, updateProject);
route.delete('/:projectId', checkProjectId, deleteProject);
module.exports = route;
