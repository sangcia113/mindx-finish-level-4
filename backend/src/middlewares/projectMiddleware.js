const { body, validationResult } = require('express-validator');
const moment = require('moment');
const projectMiddleware = {
    checkProjectId: async (req, res, next) => {
        const { projectId } = req.params;
        if (!projectId)
            return res.status(400).json({ err: -1000, msg: 'Thiếu tham số projectId!' });
        next();
    },
    checkBodyParameter: [
        body('projectName')
            .isLength({ min: 5, max: 50 })
            .withMessage('Tên dự án phải từ 5 đến 50 ký tự!'),
        body('startDate')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Ngày bắt đầu phải có định dạng yyyy-mm-dd!'),
        body('endDate')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Ngày kết thúc phải có định dạng yyyy-mm-dd!'),
        body('description')
            .isLength({ min: 5, max: 500 })
            .withMessage('Mô tả dự án phải từ 5 đến 500 ký tự!'),
        body().custom(value => {
            const startDate = new Date(value.startDate);
            const endDate = new Date(value.endDate);
            if (startDate > endDate) throw new Error('Ngày bắt đầu phải trước ngày kết thúc!');
            return true;
        }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            next();
        },
    ],
};
module.exports = projectMiddleware;
