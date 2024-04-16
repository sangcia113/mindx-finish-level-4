const { body, validationResult } = require('express-validator');
const { getCommentById } = require('../services/commentService');
const mentionMiddleware = {
    checkMentionId: async (req, res, next) => {
        const { mentionId } = req.params;
        if (!mentionId)
            return res.status(400).json({ err: -1000, msg: 'Missing mention id parameter!' });
        next();
    },
    checkBodyParameter: [
        body('commentId')
            .isMongoId()
            .withMessage('commentId không hợp lệ!')
            .notEmpty()
            .withMessage('commentId không được để trống!')
            .custom(async value => {
                const commentId = await getCommentById(commentId);
                if (!commentId) throw new Error('commentId không hợp lệ!');
            }),
        body('userId')
            .isMongoId()
            .withMessage('userId không hợp lệ!')
            .notEmpty()
            .withMessage('userId không được để trống!')
            .custom(async value => {
                const userId = await getCommentById(userId);
                if (!userId) throw new Error('userId không hợp lệ!');
            }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            next();
        },
    ],
};
module.exports = mentionMiddleware;
