const { body, validationResult } = require('express-validator');
const { PRIORITY_TASK, STATUS_TASK } = require('../constants');
const { getStageById } = require('../services/stageService');
const { getUserById } = require('../services/userService');
const taskMiddleware = {
    checkTaskId: async (req, res, next) => {
        const { taskId } = req.params;
        if (!taskId) return res.status(400).json({ err: -1000, msg: 'Thiếu tham số stageId!' });
        next();
    },
    checkBodyParameter: [
        body('stage')
            .isMongoId()
            .withMessage('Stage không hợp lệ!')
            .notEmpty()
            .withMessage('Stage không được để trống!'),
        body('taskName')
            .isLength({ min: 5, max: 50 })
            .withMessage('Tên stage phải từ 5 đến 50 ký tự!'),
        body('taskType')
            .isLength({ min: 5, max: 50 })
            .withMessage('Tên stage phải từ 5 đến 50 ký tự!'),
        body('priority').isIn(PRIORITY_TASK).withMessage('Role không hợp lệ!'),
        body('startDate')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Ngày bắt đầu phải có định dạng yyyy-mm-dd!'),
        body('deadline')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Deadline phải có định dạng yyyy-mm-dd!'),
        body('description')
            .isLength({ min: 5, max: 100 })
            .withMessage('Tên stage phải từ 5 đến 100 ký tự!'),
        body('status').isIn(STATUS_TASK).withMessage('Trạng thái không hợp lệ!'),
        body('creator')
            .isMongoId()
            .withMessage('userId không hợp lệ!')
            .notEmpty()
            .withMessage('userId không được để trống!'),
        body('assignedTo')
            .isMongoId()
            .withMessage('userId không hợp lệ!')
            .notEmpty()
            .withMessage('userId không được để trống!'),
        body().custom(async value => {
            const stage = await getStageById(value.stage);
            const creator = await getUserById(value.creator);
            const assignedTo = await getUserById(value.assignedTo);
            if (!stage) throw new Error('stage không hợp lệ!');
            if (!creator) throw new Error('creator không hợp lệ!');
            if (!assignedTo) throw new Error('assignedTo không hợp lệ!');
            return true;
        }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            next();
        },
    ],
};
module.exports = taskMiddleware;
