const route = require('express').Router();
const {
    createMention,
    getAllMention,
    getMentionById,
    getMentionByCommentId,
    getMentionByUserId,
    updateMention,
    deleteMention,
} = require('../controllers/mentionController');
const {
    checkBodyParameter,
    checkMentionId,
    checkCommentId,
    checkUserId,
} = require('../middlewares/mentionMiddleware');
route.post('/', checkBodyParameter, createMention);
route.get('/all', getAllMention);
route.get('/:mentionId', checkMentionId, getMentionById);
route.get('/comment/:commentId', checkCommentId, getMentionByCommentId);
route.get('/user/:userId', checkUserId, getMentionByUserId);
route.put('/:mentionId', checkMentionId, checkBodyParameter, updateMention);
route.delete('/:mentionId', checkMentionId, deleteMention);
module.exports = route;
