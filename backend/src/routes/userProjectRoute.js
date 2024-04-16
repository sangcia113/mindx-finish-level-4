const route = require('express').Router();
const {
    createUserProject,
    getUserProjectById,
    getUserProjectByQuery,
    updateUserProject,
    deleteUserProject,
    getUserNotInProject,
} = require('../controllers/userProjectController');
const {
    checkBodyParameter,
    checkUserProjectId,
    checkProjectId,
} = require('../middlewares/userProjectMiddleware');

// ok
route.post('/', createUserProject);

// ok
route.get('/search', getUserProjectByQuery);

// ok
route.get('/not-in-project/:projectId', checkProjectId, getUserNotInProject);

route.get('/:projectId', checkUserProjectId, getUserProjectById);

route.put('/:userProjectId', checkUserProjectId, updateUserProject);

// ok
route.delete('/:userProjectId', checkUserProjectId, deleteUserProject);

module.exports = route;
