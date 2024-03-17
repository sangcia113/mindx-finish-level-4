const mentionMiddleware = {
    checkMentionId: async (req, res, next) => {
        const { mentionId } = req.params;
        if (!mentionId)
            return res.status(400).json({ err: -1000, msg: 'Missing mention id parameter!' });
        next();
    },
    checkCommentId: async (req, res, next) => {
        const { commentId } = req.params;
        if (!commentId)
            return res.status(400).json({ err: -1000, msg: 'Missing comment id parameter!' });
        next();
    },
    checkUserId: async (req, res, next) => {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ err: -1000, msg: 'Missing user id parameter!' });
        next();
    },
    checkBodyParameter: async (req, res, next) => {
        const { commentId, userId } = req.body;
        if (!commentId)
            return res.status(400).json({ err: -1001, msg: 'Missing task id parameter!' });
        if (!userId) return res.status(400).json({ err: -1001, msg: 'Missing user id parameter!' });
        next();
    },
};
module.exports = mentionMiddleware;
