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
const {
    checkBodyParameter,
    checkCommentId,
    checkTaskId,
    checkUserId,
} = require('../middlewares/commentMiddleware');
route.post('/', checkBodyParameter, createComment);
route.get('/all', getAllComment);
route.get('/:commentId', checkCommentId, getCommentById);
route.get('/task/:taskId', checkTaskId, getCommentByTaskId);
route.get('/user/:userId', checkUserId, getCommentByUserId);
route.put('/:commentId', checkCommentId, checkBodyParameter, updatecomment);
route.delete('/:commentId', checkCommentId, deleteComment);
module.exports = route;
