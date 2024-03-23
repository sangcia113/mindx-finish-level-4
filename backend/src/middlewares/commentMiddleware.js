const { body, validationResult } = require('express-validator');
const { getTaskById } = require('../services/taskService');
const { getUserById } = require('../services/userService');
const commentMiddleware = {
    checkCommentId: async (req, res, next) => {
        const { commentId } = req.params;
        if (!commentId)
            return res.status(400).json({ err: -1000, msg: 'Missing comment id parameter!' });
        next();
    },
    checkBodyParameter: [
        body('taskId')
            .isMongoId()
            .withMessage('taskId không hợp lệ!')
            .notEmpty()
            .withMessage('taskId không được để trống!')
            .custom(async value => {
                const taskId = await getTaskById(taskId);
                if (!taskId) throw new Error('TaskId không hợp lệ!');
            }),
        body('userId')
            .isMongoId()
            .withMessage('userId không hợp lệ!')
            .notEmpty()
            .withMessage('userId không được để trống!')
            .custom(async value => {
                const userId = await getUserById(userId);
                if (!userId) throw new Error('userId không hợp lệ!');
            }),
        body('content')
            .isLength({ min: 5, max: 500 })
            .withMessage('Content phải từ 5 đến 500 ký tự!'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            next();
        },
    ],
};
module.exports = commentMiddleware;
