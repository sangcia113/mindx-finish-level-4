const { body, validationResult } = require('express-validator');
const { getProjectById } = require('../services/projectService');
const stageMiddleware = {
    checkStageId: async (req, res, next) => {
        const { stageId } = req.params;
        if (!stageId)
            return res.status(400).json({ err: -1000, msg: 'Missing stage id parameter!' });
        next();
    },
    checkBodyParameter: [
        body('projectId')
            .isMongoId()
            .withMessage('projectId không hợp lệ!')
            .notEmpty()
            .withMessage('projectId không được để trống!'),
        body('stageName')
            .isLength({ min: 5, max: 50 })
            .withMessage('Tên stage phải từ 5 đến 50 ký tự!'),
        body('startDate')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Ngày bắt đầu phải có định dạng yyyy-mm-dd!'),
        body('endDate')
            .isDate({ format: 'YYYY-MM-DD' })
            .withMessage('Ngày bắt đầu phải có định dạng yyyy-mm-dd!'),
        body().custom(async value => {
            const projectId = await getProjectById(value.projectId);
            const startDate = new Date(value.startDate);
            const endDate = new Date(value.endDate);
            if (!projectId) throw new Error('project không hợp lệ!');
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
module.exports = stageMiddleware;
