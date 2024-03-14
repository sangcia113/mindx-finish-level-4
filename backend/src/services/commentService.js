const Comment = require('../models/commentModel');
const commentService = {
    createComment: async commentData => await new Comment(commentData).save(),
    getAllComment: async () => await Comment.find(),
    getCommentById: async commentId => await Comment.findById(commentId),
    getCommentByTaskId: async taskId => await Comment.findOne({ taskId }),
    getCommentByUserId: async userId => await Comment.findOne({ userId }),
    updateComment: async (commentId, commentData) =>
        await Comment.findByIdAndUpdate(commentId, commentData),
    deleteComment: async commentId => await Comment.findByIdAndDelete(commentId),
};
module.exports = commentService;
