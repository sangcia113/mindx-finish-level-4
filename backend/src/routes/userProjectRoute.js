const route = require('express').Router();
const {
    createUserProject,
    getUserProjectById,
    getUserProjectByQuery,
    updateUserProject,
    deleteUserProject,
} = require('../controllers/userProjectController');
const { checkBodyParameter, checkUserProjectId } = require('../middlewares/userProjectMiddleware');
route.post('/', checkBodyParameter, createUserProject);
route.get('/search', getUserProjectByQuery);
route.get('/:userProjectId', checkUserProjectId, getUserProjectById);
route.put('/:userProjectId', checkUserProjectId, checkBodyParameter, updateUserProject);
route.delete('/:userProjectId', checkUserProjectId, deleteUserProject);
module.exports = route;
