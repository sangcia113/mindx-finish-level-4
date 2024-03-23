const route = require('express').Router();
const {
    createMention,
    getMentionById,
    getMentionByQuery,
    updateMention,
    deleteMention,
} = require('../controllers/mentionController');
const { checkBodyParameter, checkMentionId } = require('../middlewares/mentionMiddleware');
route.post('/', checkBodyParameter, createMention);
route.get('/search', getMentionByQuery);
route.get('/:mentionId', checkMentionId, getMentionById);
route.put('/:mentionId', checkMentionId, checkBodyParameter, updateMention);
route.delete('/:mentionId', checkMentionId, deleteMention);
module.exports = route;
