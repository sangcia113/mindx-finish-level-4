const {
    createComment,
    getAllComment,
    getCommentById,
    getCommentByTaskId,
    getCommentByUserId,
    updateComment,
    deleteComment,
} = require('../services/commentService');
const commentController = {
    createComment: async (req, res) => {
        try {
            const commentData = req.body;
            await createComment(commentData);
            res.status(201).json({ err: 0, msg: 'Insert comment successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getAllComment: async (req, res) => {
        try {
            const results = await getAllComment();
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getCommentById: async (req, res) => {
        try {
            const { commentId } = req.params;
            const results = await getCommentById(commentId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getCommentByTaskId: async (req, res) => {
        try {
            const { taskId } = req.params;
            const results = await getCommentByTaskId(taskId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    getCommentByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const results = await getCommentByUserId(userId);
            res.status(201).json(results);
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    updatecomment: async (req, res) => {
        try {
            const { commentId } = req.params;
            const commentData = req.body;
            await updateComment(commentId, commentData);
            res.status(201).json({ err: 0, msg: 'Update comment successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
    deleteComment: async (req, res) => {
        try {
            const { commentId } = req.params;
            await deleteComment(commentId);
            res.status(201).json({ err: 0, msg: 'Delete comment successfully!' });
        } catch (error) {
            res.status(500).json({ err: -1000, msg: error });
        }
    },
};
module.exports = commentController;
