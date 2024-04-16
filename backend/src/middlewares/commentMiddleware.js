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
        body('task')
            .isMongoId()
            .withMessage('Task không hợp lệ!')
            .notEmpty()
            .withMessage('Task không được để trống!')
            .custom(async value => {
                const task = await getTaskById(value.task);
                if (!task) throw new Error('Task không hợp lệ!');
            }),
        body('user')
            .isMongoId()
            .withMessage('User không hợp lệ!')
            .notEmpty()
            .withMessage('User không được để trống!')
            .custom(async value => {
                const user = await getUserById(value.user);
                if (!user) throw new Error('user không hợp lệ!');
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
