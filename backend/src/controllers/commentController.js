const {
    createComment,
    getCommentById,
    getCommentByQuery,
    updateComment,
    deleteComment,
} = require('../services/commentService');
const commentController = {
    createComment: async (req, res) => {
        const commentData = req.body;
        try {
            await createComment(commentData);
            res.status(200).json({ err: 0, msg: 'Add successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getCommentById: async (req, res) => {
        const { commentId } = req.params;
        try {
            const results = await getCommentById(commentId);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getCommentByQuery: async (req, res) => {
        const { taskId, userId } = req.query;
        const query = {};
        if (taskId) query.taskId = taskId;
        if (userId) query.userId = userId;
        try {
            const results = await getCommentByQuery(query);
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updateComment: async (req, res) => {
        const { commentId } = req.params;
        const commentData = req.body;
        try {
            await updateComment(commentId, commentData);
            res.status(200).json({ err: 0, msg: 'Update successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteComment: async (req, res) => {
        const { commentId } = req.params;
        try {
            await deleteComment(commentId);
            res.status(200).json({ err: 0, msg: 'Delete successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = commentController;
