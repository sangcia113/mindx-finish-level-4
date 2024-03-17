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
const {
    checkBodyParameter,
    checkProjectId,
    checkUserId,
    checkUserProjectId,
} = require('../middlewares/userProjectMiddleware');
route.post('/', checkBodyParameter, createUserProject);
route.get('/all', getAllUserProject);
route.get('/:userProjectId', checkUserProjectId, getUserProjectById);
route.get('/user/:userId', checkUserId, getUserProjectByUserId);
route.get('/project/:projectId', checkProjectId, getUserProjectByProjectId);
route.put('/:userProjectId', checkUserProjectId, checkBodyParameter, updateUserProject);
route.delete('/:userProjectId', checkUserProjectId, deleteUserProject);
module.exports = route;
