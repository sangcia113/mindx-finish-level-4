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
            .withMessage('stageId is not valid!')
            .notEmpty()
            .withMessage('stageId cannot be empty!')
            .custom(async value => {
                const stageId = await getStageById(stageId);
                if (!stageId) throw new Error('stageId is not valid!');
            }),
        body('userId')
            .isMongoId()
            .withMessage('userId is not valid!')
            .notEmpty()
            .withMessage('userId cannot be empty!')
            .custom(async value => {
                const userId = await getUserById(userId);
                if (!userId) throw new Error('userId is not valid!');
            }),
        body('content').isLength({ min: 5, max: 500 }).withMessage('Min 5, max 500 character!'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            next();
        },
    ],
};
module.exports = assessmentMiddleware;
