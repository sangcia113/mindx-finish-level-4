const route = require('express').Router();
const {
    createComment,
    getAllComment,
    getCommentById,
    getCommentByTaskId,
    getCommentByUserId,
    updatecomment,
    deleteComment,
} = require('../controllers/commentController');
route.post('/', createComment);
route.get('/all', getAllComment);
route.get('/:id', getCommentById);
route.get('/task/:id', getCommentByTaskId);
route.get('/user/:id', getCommentByUserId);
route.put('/:id', updatecomment);
route.delete('/:id', deleteComment);
module.exports = route;
