const route = require('express').Router();
const {
    createUserProject,
    getAllUserProject,
    getUserProjectById,
    getUserProjectByUserId,
    getUserProjectByProjectId,
    updateUserProject,
    deleteUserProject,
} = require('../controllers/userProjectController');
route.post('/', createUserProject);
route.get('/all', getAllUserProject);
route.get('/:id', getUserProjectById);
route.get('/user/:id', getUserProjectByUserId);
route.get('/project/:id', getUserProjectByProjectId);
route.put('/:id', updateUserProject);
route.delete('/:id', deleteUserProject);
module.exports = route;
