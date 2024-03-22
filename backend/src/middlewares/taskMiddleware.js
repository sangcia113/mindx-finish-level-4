const { body, validationResult } = require('express-validator');
const momentjs = require('moment');
const taskMiddleware = {
    checkTaskId: async (req, res, next) => {
        const { taskId } = req.params;
        if (!taskId) return res.status(400).json({ err: -1000, msg: 'Missing task id parameter!' });
        next();
    },
    checkStageId: async (req, res, next) => {
        const { stageId } = req.params;
        if (stageId)
            return res.status(400).json({ err: -1000, msg: 'Missing stage id parameter!' });
        next();
    },
    checkBodyParameter: [
        body('stageId')
            .isMongoId()
            .withMessage('StageId không hợp lệ!')
            .notEmpty()
            .withMessage('StageId không được để trống!'),
        body('name').isLength({ min: 5, max: 50 }).withMessage('Tên stage phải từ 5 đến 50 ký tự!'),
        body('type').isLength({ min: 5, max: 50 }).withMessage('Tên stage phải từ 5 đến 50 ký tự!'),
        body('priority')
            .isIn(['Highest', 'High', 'Medium', 'Low', 'Lowest'])
            .withMessage('Role không hợp lệ!'),
        body('startDate')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Ngày bắt đầu phải có định dạng yyyy-mm-dd!'),
        body('deadline')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Deadline phải có định dạng yyyy-mm-dd!'),
        body('description')
            .isLength({ min: 5, max: 100 })
            .withMessage('Tên stage phải từ 5 đến 100 ký tự!'),
        body('status')
            .isIn(['Open', 'In Progress', 'In Review', 'Done', 'Re-Open', 'Cancel'])
            .withMessage('Trạng thái không hợp lệ!'),
        body('createdBy')
            .isMongoId()
            .withMessage('UserId không hợp lệ!')
            .notEmpty()
            .withMessage('UserId không được để trống!'),
        body('assignedTo')
            .isMongoId()
            .withMessage('UserId không hợp lệ!')
            .notEmpty()
            .withMessage('UserId không được để trống!'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            next();
        },
    ],
};
module.exports = taskMiddleware;
