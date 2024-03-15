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
route.post('/', createMention);
route.get('/all', getAllMention);
route.get('/:id', getMentionById);
route.get('/comment/:id', getMentionByCommentId);
route.get('/user/:id', getMentionByUserId);
route.put('/:id', updateMention);
route.delete('/:id', deleteMention);
module.exports = route;
