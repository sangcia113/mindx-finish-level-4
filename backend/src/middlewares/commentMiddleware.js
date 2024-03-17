const commentMiddleware = {
    checkCommentId: async (req, res, next) => {
        const { commentId } = req.params;
        if (!commentId)
            return res.status(400).json({ err: -1000, msg: 'Missing comment id parameter!' });
        next();
    },
    checkTaskId: async (req, res, next) => {
        const { taskId } = req.params;
        if (!taskId) return res.status(400).json({ err: -1000, msg: 'Missing task id parameter!' });
        next();
    },
    checkUserId: async (req, res, next) => {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ err: -1000, msg: 'Missing user id parameter!' });
        next();
    },
    checkBodyParameter: async (req, res, next) => {
        const { taskId, userId, content } = req.body;
        if (!taskId) return res.status(400).json({ err: -1001, msg: 'Missing task id parameter!' });
        if (!userId) return res.status(400).json({ err: -1001, msg: 'Missing user id parameter!' });
        if (!content)
            return res.status(400).json({ err: -1001, msg: 'Missing content parameter!' });
        next();
    },
};
module.exports = commentMiddleware;
