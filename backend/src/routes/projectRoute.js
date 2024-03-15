const route = require('express').Router();
const {
    getAllProject,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
route.post('/', createProject);
route.get('/all', getAllProject);
route.get('/:id', getProjectById);
route.put('/:id', updateProject);
route.delete('/:id', deleteProject);
module.exports = route;
