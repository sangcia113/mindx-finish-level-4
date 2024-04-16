const Comment = require('../models/commentModel');
const commentService = {
    createComment: async commentData => await new Comment(commentData).save(),
    getCommentById: async commentId => await Comment.findById(commentId),
    getCommentByQuery: async query => await Comment.find(query),
    updateComment: async (commentId, commentData) =>
        await Comment.findByIdAndUpdate(commentId, commentData),
    deleteComment: async commentId => await Comment.findByIdAndDelete(commentId),
};
module.exports = commentService;
