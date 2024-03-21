const { body, validationResult } = require('express-validator');
const projectMiddleware = {
    checkProjectId: async (req, res, next) => {
        const { projectId } = req.params;
        if (!projectId)
            return res.status(400).json({ err: -1000, msg: 'Missing project id parameter!' });
        next();
    },
    checkBodyParameter: [
        body('name').isLength({ min: 5, max: 50 }).withMessage('Tên dự án phải từ 5 đến 50 ký tự!'),
        body('startDate')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Ngày bắt đầu phải có định dạng yyyy-mm-dd!'),
        body('endDate')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Ngày bắt đầu phải có định dạng yyyy-mm-dd!'),
        body('description')
            .isLength({ min: 5, max: 50 })
            .withMessage('Mô tả dự án phải từ 5 đến 50 ký tự!'),
        body('status')
            .isIn(['Preparation', 'In Progress', 'Suspended', 'Completed'])
            .withMessage('Trạng thái không hợp lệ!'),
        body('userId')
            .isMongoId()
            .withMessage('UserId không hợp lệ!')
            .notEmpty()
            .withMessage('UserId không được để trống!'),
        body().custom(value => {
            const startDate = new Date(value.startDate);
            const endDate = new Date(value.endDate);
            if (startDate >= endDate) throw new Error('Ngày bắt đầu phải trước ngày kết thúc!');
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
