const { body, validationResult } = require('express-validator');
const { getStageById } = require('../services/stageService');
const { getUserById } = require('../services/userService');
const assessmentMiddleware = {
    checkAssessmentId: async (req, res, next) => {
        const { assessmentId } = req.params;
        if (!assessmentId)
            return res.status(400).json({ err: -1000, msg: 'Thiếu tham số assessmentId!' });
        next();
    },
    checkBodyParameter: [
        body('stageId')
            .isMongoId()
            .withMessage('stageId không hợp lệ!')
            .notEmpty()
            .withMessage('stageId không được để trống!')
            .custom(async value => {
                const stageId = await getStageById(stageId);
                if (!stageId) throw new Error('stageId không hợp lệ!');
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
module.exports = assessmentMiddleware;
