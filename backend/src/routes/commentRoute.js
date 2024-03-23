const route = require('express').Router();
const {
    createComment,
    getCommentById,
    getCommentByQuery,
    updateComment,
    deleteComment,
} = require('../controllers/commentController');
const { checkBodyParameter, checkCommentId } = require('../middlewares/commentMiddleware');
route.post('/', checkBodyParameter, createComment);
route.get('/search', getCommentByQuery);
route.get('/:commentId', checkCommentId, getCommentById);
route.put('/:commentId', checkCommentId, checkBodyParameter, updateComment);
route.delete('/:commentId', checkCommentId, deleteComment);
module.exports = route;
